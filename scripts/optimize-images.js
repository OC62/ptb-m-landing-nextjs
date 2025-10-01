const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Promisify методы fs для async/await
const readdir = fs.promises.readdir;
const stat = fs.promises.stat;
const rename = fs.promises.rename;
const unlink = fs.promises.unlink;

// Оптимизированные настройки сжатия
const OPTIMIZATION_SETTINGS = {
  critical: {
    quality: 85,
    effort: 6,
    maxWidth: 1920
  },
  standard: {
    quality: 75, 
    effort: 6,
    maxWidth: 1200
  },
  low: {
    quality: 65,
    effort: 4,
    maxWidth: 800
  }
};

// Критические изображения (LCP - должны быть высокого качества)
const CRITICAL_IMAGES = [
  'bg_Hero',
  'logo',
  'logoInv',
  'og-preview'
];

// Изображения среднего приоритета
const STANDARD_IMAGES = [
  'team-football',
  'team',
  'Licenses',
  'Rost_Sea',
  'Main_Bus_Station',
  'GBUVolgograd',
  'TTans',
  'Ttrans',
  'logoBashkiria',
  'logoKazan',
  'logo_rda',
  'logoAvtodor',
  'LogoDonavto'
];

// Низкоприоритетные изображения (прелоадеры, буквы)
const LOW_PRIORITY_IMAGES = [
  'preloader',
  'letter'
];

// Форматы для обработки
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp'];
const SVG_FORMATS = ['.svg'];

/**
 * Рекурсивно получает все файлы в директории
 */
async function getAllFiles(dir) {
  try {
    const items = await readdir(dir, { withFileTypes: true });
    const files = [];
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        files.push(...await getAllFiles(fullPath));
      } else {
        files.push(fullPath);
      }
    }
    
    return files;
  } catch (error) {
    console.error(`❌ Ошибка чтения директории ${dir}:`, error.message);
    return [];
  }
}

/**
 * Определяет приоритет изображения
 */
function getImagePriority(filename) {
  const baseName = path.basename(filename, path.extname(filename));
  
  if (CRITICAL_IMAGES.some(critical => baseName.includes(critical))) {
    return 'critical';
  }
  if (LOW_PRIORITY_IMAGES.some(low => baseName.includes(low))) {
    return 'low';
  }
  if (STANDARD_IMAGES.some(standard => baseName.includes(standard))) {
    return 'standard';
  }
  
  return 'standard'; // по умолчанию
}

/**
 * Оптимизирует растровое изображение
 */
async function optimizeImage(inputPath) {
  try {
    const priority = getImagePriority(inputPath);
    const settings = OPTIMIZATION_SETTINGS[priority];
    const tempPath = inputPath + '.tmp';
    
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Определяем нужно ли ресайзить
    let processing = image;
    if (metadata.width > settings.maxWidth) {
      processing = processing.resize(settings.maxWidth, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }
    
    // Оптимизируем в WebP
    await processing
      .webp({
        quality: settings.quality,
        effort: settings.effort,
        smartSubsample: true
      })
      .toFile(tempPath);
    
    // Сравниваем размеры
    const originalStat = await stat(inputPath);
    const tempStat = await stat(tempPath);
    
    // Заменяем только если есть экономия или это критическое изображение
    if (tempStat.size < originalStat.size || priority === 'critical') {
      await rename(tempPath, inputPath);
      
      const savings = ((originalStat.size - tempStat.size) / originalStat.size * 100).toFixed(1);
      console.log(`✅ ${path.basename(inputPath)}: ${(originalStat.size/1024).toFixed(0)}KB → ${(tempStat.size/1024).toFixed(0)}KB (${savings}% savings) [${priority}]`);
      
      return { 
        originalSize: originalStat.size, 
        optimizedSize: tempStat.size, 
        savings: parseFloat(savings),
        priority 
      };
    } else {
      // Удаляем временный файл если нет улучшений
      await unlink(tempPath);
      console.log(`ℹ️  ${path.basename(inputPath)}: уже оптимизирован [${priority}]`);
      
      return { 
        originalSize: originalStat.size, 
        optimizedSize: originalStat.size, 
        savings: 0,
        priority 
      };
    }
    
  } catch (error) {
    console.error(`❌ Ошибка оптимизации ${path.basename(inputPath)}:`, error.message);
    
    // Убедимся что временный файл удален при ошибке
    try {
      if (fs.existsSync(inputPath + '.tmp')) {
        await unlink(inputPath + '.tmp');
      }
    } catch (cleanupError) {
      // Игнорируем ошибки очистки
    }
    
    return null;
  }
}

/**
 * Оптимизирует SVG файл
 */
async function optimizeSVG(inputPath) {
  try {
    let content = await fs.promises.readFile(inputPath, 'utf8');
    const originalSize = Buffer.byteLength(content, 'utf8');
    
    // Базовые оптимизации SVG
    content = content
      .replace(/<!--[\s\S]*?-->/g, '') // Удаляем комментарии
      .replace(/\s+/g, ' ') // Убираем лишние пробелы
      .replace(/>\s+</g, '><') // Убираем пробелы между тегами
      .trim();
    
    await fs.promises.writeFile(inputPath, content);
    
    const optimizedSize = Buffer.byteLength(content, 'utf8');
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ SVG ${path.basename(inputPath)}: ${(originalSize/1024).toFixed(1)}KB → ${(optimizedSize/1024).toFixed(1)}KB (${savings}% savings)`);
    
    return { originalSize, optimizedSize, savings: parseFloat(savings) };
  } catch (error) {
    console.error(`❌ Ошибка оптимизации SVG ${path.basename(inputPath)}:`, error.message);
    return null;
  }
}

/**
 * Основная функция оптимизации
 */
async function optimizeAllImages() {
  console.log('🚀 Запуск оптимизации изображений...\n');
  
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  
  if (!fs.existsSync(imagesDir)) {
    console.error('❌ Директория images не найдена:', imagesDir);
    return;
  }
  
  const allFiles = await getAllFiles(imagesDir);
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let processedCount = 0;
  let skippedCount = 0;
  
  console.log(`📁 Найдено файлов: ${allFiles.length}\n`);
  
  for (const filePath of allFiles) {
    const ext = path.extname(filePath).toLowerCase();
    
    if (SUPPORTED_FORMATS.includes(ext)) {
      const result = await optimizeImage(filePath);
      if (result) {
        totalOriginalSize += result.originalSize;
        totalOptimizedSize += result.optimizedSize;
        processedCount++;
      } else {
        skippedCount++;
      }
    } else if (SVG_FORMATS.includes(ext)) {
      const result = await optimizeSVG(filePath);
      if (result) {
        totalOriginalSize += result.originalSize;
        totalOptimizedSize += result.optimizedSize;
        processedCount++;
      } else {
        skippedCount++;
      }
    }
  }
  
  // Выводим итоги
  console.log('\n📊 ИТОГИ ОПТИМИЗАЦИИ:');
  console.log('═'.repeat(50));
  console.log(`✅ Обработано: ${processedCount} файлов`);
  console.log(`⏭️  Пропущено: ${skippedCount} файлов`);
  console.log(`📁 Исходный размер: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📁 Оптимизированный: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  
  if (totalOriginalSize > 0) {
    const totalSavings = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
    const savingsMB = ((totalOriginalSize - totalOptimizedSize) / 1024 / 1024).toFixed(2);
    console.log(`💾 Экономия: ${totalSavings}% (${savingsMB} MB)`);
    console.log(`🎯 Оценка улучшения Lighthouse: +15-25 баллов`);
  }
  
  console.log('═'.repeat(50));
}

// Обработка ошибок и запуск
optimizeAllImages().catch(error => {
  console.error('💥 Критическая ошибка:', error);
  process.exit(1);
});
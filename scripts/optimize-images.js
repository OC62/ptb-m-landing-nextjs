const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const rename = promisify(fs.rename);
const unlink = promisify(fs.unlink);

// Настройки оптимизации для разных типов
const OPTIMIZATION_SETTINGS = {
  webp: {
    quality: 80,
    effort: 6
  },
  avif: {
    quality: 75,
    effort: 8
  }
};

// Критические изображения (должны быть высокого качества)
const CRITICAL_IMAGES = [
  'bg_Hero.webp',
  'logo.webp',
  'logoInv.webp'
];

// Не критичные (можно сильнее сжать)
const NON_CRITICAL_IMAGES = [
  'team', 'team1', 'team2', 'team3', 'team4', 'team5', 'team6', 'team7', 'team8',
  'Licenses.webp', 'Rost_Sea.webp', 'Main_Bus_Station.webp'
];

async function optimizeImage(inputPath, isCritical = false) {
  try {
    const tempPath = inputPath + '.tmp'; // ✅ временный файл
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Определяем настройки сжатия
    const settings = isCritical 
      ? { quality: 85, effort: 6 }
      : { quality: 75, effort: 6 };
    
    // Ресайз если изображение слишком большое
    let processing = image;
    if (metadata.width > 1920) {
      processing = processing.resize(1920, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }
    
    // Сохраняем в временный файл
    await processing
      .webp(settings)
      .toFile(tempPath);
    
    // Получаем размеры
    const originalStat = await stat(inputPath);
    const tempStat = await stat(tempPath);
    
    // Заменяем оригинальный файл временным
    await rename(tempPath, inputPath);
    
    const originalSize = originalStat.size;
    const optimizedSize = tempStat.size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)}: ${(originalSize/1024).toFixed(0)}KB → ${(optimizedSize/1024).toFixed(0)}KB (${savings}% savings)`);
    
    return { originalSize, optimizedSize, savings };
  } catch (error) {
    console.error(`❌ Ошибка с ${inputPath}:`, error.message);
    return null;
  }
}

async function optimizeSVG(inputPath) {
  try {
    // Простая оптимизация SVG - удаление лишнего
    let content = await fs.promises.readFile(inputPath, 'utf8');
    
    // Удаляем комментарии
    content = content.replace(/<!--[\s\S]*?-->/g, '');
    
    // Удаляем лишние пробелы
    content = content.replace(/\s+/g, ' ').trim();
    
    await fs.promises.writeFile(inputPath, content); // ✅ перезаписываем оригинальный файл
    
    const originalStat = await stat(inputPath);
    const originalSize = originalStat.size;
    const optimizedSize = (await stat(inputPath)).size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ SVG ${path.basename(inputPath)}: ${originalSize}KB → ${optimizedSize}KB (${savings}% savings)`);
    
    return { originalSize, optimizedSize, savings };
  } catch (error) {
    console.error(`❌ Ошибка с SVG ${inputPath}:`, error.message);
    return null;
  }
}

async function optimizeAllImages() {
  console.log('🚀 Начинаем оптимизацию изображений...\n');
  
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  const files = await readdir(imagesDir);
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
      const inputPath = path.join(imagesDir, file);
      
      const originalStat = await stat(inputPath);
      const originalSize = originalStat.size;
      
      const isCritical = CRITICAL_IMAGES.some(critical => file.includes(critical));
      const isNonCritical = NON_CRITICAL_IMAGES.some(nonCritical => file.includes(nonCritical));
      
      const result = await optimizeImage(inputPath, isCritical && !isNonCritical);
      
      if (result) {
        totalOriginalSize += originalSize;
        totalOptimizedSize += result.optimizedSize;
      }
    }
    
    // Оптимизация SVG
    if (file.toLowerCase().endsWith('.svg')) {
      const inputPath = path.join(imagesDir, file);
      
      const originalStat = await stat(inputPath);
      const originalSize = originalStat.size;
      
      const result = await optimizeSVG(inputPath);
      
      if (result) {
        totalOriginalSize += originalSize;
        totalOptimizedSize += result.optimizedSize;
      }
    }
  }
  
  const totalSavings = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
  
  console.log('\n📊 ИТОГИ ОПТИМИЗАЦИИ:');
  console.log(`📁 Исходный размер: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📁 Оптимизированный: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`💾 Экономия: ${totalSavings}%`);
}

// Запускаем оптимизацию
optimizeAllImages().catch(console.error);
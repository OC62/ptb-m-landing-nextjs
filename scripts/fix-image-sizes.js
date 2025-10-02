const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Директории для поиска компонентов
const COMPONENT_DIRS = [
  'src/app/components/sections',
  'src/app/components/ui',
  'src/app/components/layout'
];

// Файлы изображений для анализа размеров
const IMAGE_SIZES = {};

async function getImageDimensions(imagePath) {
  try {
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    return { width: metadata.width, height: metadata.height };
  } catch (error) {
    console.warn(`❌ Не удалось получить размеры для ${imagePath}:`, error.message);
    return { width: 800, height: 600 }; // fallback размеры
  }
}

async function processComponentFile(filePath) {
  try {
    let content = await fs.promises.readFile(filePath, 'utf8');
    let modified = false;

    // Регулярное выражение для поиска компонентов Image
    const imageRegex = /<Image[^>]*src=["']([^"']+)["'][^>]*>/g;
    
    let match;
    while ((match = imageRegex.exec(content)) !== null) {
      const fullTag = match[0];
      const src = match[1];
      
      // Пропускаем если уже есть width/height
      if (fullTag.includes('width=') && fullTag.includes('height=')) {
        continue;
      }

      // Получаем путь к изображению
      let imagePath;
      if (src.startsWith('/')) {
        imagePath = path.join('public', src);
      } else {
        imagePath = path.join('public', 'images', src);
      }

      if (fs.existsSync(imagePath)) {
        const dimensions = await getImageDimensions(imagePath);
        
        // Заменяем тег Image с добавлением width/height
        const newTag = fullTag.replace(
          /<Image([^>]*)>/,
          `<Image$1 width={${dimensions.width}} height={${dimensions.height}}>`
        );
        
        content = content.replace(fullTag, newTag);
        modified = true;
        
        console.log(`✅ Добавлены размеры для ${path.basename(src)}: ${dimensions.width}x${dimensions.height}`);
      } else {
        console.warn(`⚠️  Изображение не найдено: ${imagePath}`);
      }
    }

    // Заменяем обычные img на Image компоненты
    const imgRegex = /<img[^>]*src=["']([^"']+)["'][^>]*>/g;
    while ((match = imgRegex.exec(content)) !== null) {
      const fullTag = match[0];
      const src = match[1];
      
      // Пропускаем если это уже Next.js Image
      if (content.includes('next/image')) continue;

      let imagePath;
      if (src.startsWith('/')) {
        imagePath = path.join('public', src);
      } else {
        imagePath = path.join('public', 'images', src);
      }

      if (fs.existsSync(imagePath)) {
        const dimensions = await getImageDimensions(imagePath);
        const altMatch = fullTag.match(/alt=["']([^"']*)["']/);
        const alt = altMatch ? altMatch[1] : 'Изображение';
        const classNameMatch = fullTag.match(/class(Name)?=["']([^"']*)["']/);
        const className = classNameMatch ? classNameMatch[2] : '';
        
        const newTag = `<Image src="${src}" alt="${alt}" width={${dimensions.width}} height={${dimensions.height}} className="${className}" />`;
        
        content = content.replace(fullTag, newTag);
        modified = true;
        
        console.log(`✅ Заменен img на Image: ${path.basename(src)}`);
      }
    }

    if (modified) {
      await fs.promises.writeFile(filePath, content, 'utf8');
      console.log(`📝 Обновлен файл: ${filePath}`);
    }

    return modified;
  } catch (error) {
    console.error(`❌ Ошибка обработки файла ${filePath}:`, error.message);
    return false;
  }
}

async function findAllComponents(dir) {
  const files = [];
  
  try {
    const items = await fs.promises.readdir(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory()) {
        files.push(...await findAllComponents(fullPath));
      } else if (item.name.match(/\.(jsx|tsx|js)$/)) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.warn(`⚠️  Не удалось прочитать директорию ${dir}:`, error.message);
  }
  
  return files;
}

async function main() {
  console.log('🚀 Запуск автоматического исправления изображений...\n');
  
  let allComponents = [];
  
  for (const dir of COMPONENT_DIRS) {
    if (fs.existsSync(dir)) {
      const components = await findAllComponents(dir);
      allComponents.push(...components);
    }
  }
  
  console.log(`📁 Найдено компонентов: ${allComponents.length}\n`);
  
  let modifiedCount = 0;
  
  for (const componentFile of allComponents) {
    const modified = await processComponentFile(componentFile);
    if (modified) modifiedCount++;
  }
  
  console.log('\n📊 РЕЗУЛЬТАТЫ:');
  console.log('═'.repeat(50));
  console.log(`✅ Обновлено файлов: ${modifiedCount}`);
  console.log(`📁 Всего обработано: ${allComponents.length}`);
  console.log('🎯 Ожидаемое улучшение Lighthouse: +15-20 баллов');
  console.log('═'.repeat(50));
  
  if (modifiedCount > 0) {
    console.log('\n💡 ДАЛЬНЕЙШИЕ ДЕЙСТВИЯ:');
    console.log('1. Проверьте обновленные файлы');
    console.log('2. Добавьте import Image from "next/image" в файлы где его нет');
    console.log('3. Запустите сборку: npm run build');
  }
}

main().catch(console.error);
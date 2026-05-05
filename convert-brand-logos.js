// Run: node convert-brand-logos.js
// Converts all PNG brand logos to WebP and saves them in public/brands/

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const brandsDir = path.join(__dirname, 'public/brands');

fs.readdir(brandsDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err.message);
    return;
  }

  const pngFiles = files.filter(file => file.endsWith('.png'));

  if (pngFiles.length === 0) {
    console.log('No PNG files found in public/brands/');
    return;
  }

  console.log(`Converting ${pngFiles.length} PNG files to WebP...`);

  pngFiles.forEach(file => {
    const input = path.join(brandsDir, file);
    const output = path.join(brandsDir, file.replace('.png', '.webp'));

    sharp(input)
      .webp({ quality: 85, effort: 6 })
      .toFile(output)
      .then(info => {
        console.log(`✓ ${file.replace('.png', '.webp')} saved`);
        console.log(`  Size: ${(info.size / 1024).toFixed(1)} KB | ${info.width}×${info.height}`);
      })
      .catch(err => console.error(`Error converting ${file}:`, err.message));
  });
});
// Run: node convert-hero-bg.js
// Converts the hero background PNG to WebP and places it in public/images/

const sharp = require('sharp');
const path = require('path');

const input = path.join('C:/Users/SAHARA/Downloads/Gemini_Generated_Image_lxa678lxa678lxa6.png');
const output = path.join(__dirname, 'public/images/hero-bg.webp');

sharp(input)
  .webp({ quality: 85, effort: 6 })
  .toFile(output)
  .then(info => {
    console.log('✓ hero-bg.webp saved to public/images/');
    console.log(`  Size: ${(info.size / 1024).toFixed(1)} KB | ${info.width}×${info.height}`);
  })
  .catch(err => console.error('Error:', err.message));

// Download brand logos from Wikimedia and convert to WebP
// Run: node download-brand-logos.js

const https = require('https');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const brandsDir = path.join(__dirname, 'public/brands');

const brandUrls = {
  hp: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/HP_logo.svg',
  canon: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Canon_logo.svg',
  xerox: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Xerox_logo.svg',
  ricoh: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Ricoh_logo.svg',
  kyocera: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Kyocera_logo.svg',
  brother: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Brother_Logo.svg',
  sharp: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Sharp_logo.svg',
  epson: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Epson_logo.svg'
};

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };
    https.get(url, options, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
        return;
      }

      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function processBrand(slug, url) {
  const outputPath = path.join(brandsDir, `${slug}.webp`);

  try {
    console.log(`Downloading ${slug}...`);
    const imageBuffer = await downloadImage(url, outputPath);

    console.log(`Converting ${slug} to WebP...`);
    await sharp(imageBuffer)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);

    console.log(`✓ ${slug}.webp saved`);
  } catch (error) {
    console.error(`Error processing ${slug}:`, error.message);
  }
}

async function main() {
  for (const [slug, url] of Object.entries(brandUrls)) {
    await processBrand(slug, url);
  }
  console.log('All logos processed.');
}

main().catch(console.error);
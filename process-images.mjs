import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';

const inputDir = 'input_images';
const tempDir = 'temp_images';
const outputDir = 'optimized_images';

// Set your desired image width here
const resizeWidth = 2000;

// Create these directories if they do not already exist
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

async function processImage(file) {
  const fileExtension = path.extname(file).toLowerCase();
  if (['.jpg', '.jpeg', '.png'].includes(fileExtension)) {

    // set up the input, temporary, and output file paths
    const inputFile = path.join(inputDir, file);
    const tempFile = path.join(tempDir, file);
    const outputFile = path.join(outputDir, file);

    // Resize the image using ImageMagick
    spawnSync('magick', ['convert', inputFile, '-resize', `${resizeWidth}`, tempFile]);

    // Optimize the images using imagemin, set your desired optimization quality here
    await imagemin([tempFile], {
      destination: outputDir,
      plugins: [
        imageminMozjpeg({ quality: 85 }),
        imageminPngquant({ quality: [0.6, 0.8] }),
      ],
    });

    // Rename the optimized image and delete the temporary image
    const fileExtension = path.extname(file);
    const fileName = path.basename(file, fileExtension);
    const newFileName = `${fileName}-optimized${fileExtension}`;
    fs.renameSync(outputFile, path.join(outputDir, newFileName));
    fs.unlinkSync(tempFile);
  }

  console.log(`Successfully processed and optimized: ${file}`);
}

// Process all images in the input_images directory
(async () => {
  const files = fs.readdirSync(inputDir);
  for (const file of files) {
    await processImage(file);
  }
})();

# automate-image-optimization
An image optimization script built with [ImageMagick](https://imagemagick.org/) and [imagemin](https://www.npmjs.com/package/imagemin). imagemin uses the plugins [mozjpeg](https://www.npmjs.com/package/imagemin-mozjpeg) and [pngquant](https://www.npmjs.com/package/imagemin-pngquant).

## Current Usage:

To use, ensure that you have installed all the above prerequisites. Once you have that complete, add your original images to input_images folder and run the below command. If this runs you will see a success message along with the file names of each image that was optimized.

### Commands:
node process-images.mjs
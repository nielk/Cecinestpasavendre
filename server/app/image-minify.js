'use strict';
var pngquantPath = require('pngquant-bin').path,
	jpegtranPath = require('jpegtran-bin').path,
	imageMagick  = require('imagemagick'),
	execFile     = require('child_process').execFile,
	path         = require('path'),
	fs           = require('fs');

/**
 * Minify an image, it accepts png, jpg and gif.
 * @param {String} imagePath - path of the image
 * @param {function()} callback - the arg of the callback is an Error object
 */
var minify = function(imagePath, callback){

	// is the image file exists ?
	fs.exists(imagePath, function(exists) {
		if(exists) { // file exists
			// extension image (png, jpg etc...)
			var ext = path.extname(imagePath).toLowerCase();

			switch (ext) {
				case '.png':
					// resize dimension of image
					imageMagick.convert([imagePath, '-resize', '500x420', imagePath], function(err) {
						if (err) callback(err);
						// optimize image
						execFile(pngquantPath, ['--force', '--ext', '.png', imagePath], function(err) {
							if (err) callback(err);
							callback();
						});
					});
					break;

				case '.jpg':
				case '.jpeg':
					// resize dimension of image
					imageMagick.convert([imagePath, '-resize', '500x420', imagePath], function(err) {
						if(err) callback(err);
						// optimize image
						execFile(jpegtranPath, ['-outfile', imagePath, imagePath], function(err) {
							if (err) callback(err);
							callback();
						});
					});
					break;
				// image extension not allowed
				default:
					callback(new Error('Image format not supported (accepted formats: png, jpg)'));
			}
		} else { // another type of error
			callback(new Error('Image does not exist'));
		}
	});
};

module.exports = minify;
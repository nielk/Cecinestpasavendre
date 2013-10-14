'use strict';
var fs = require('fs.extra'),
	chai = require('chai'),
	expect = chai.expect,
	minify = require('../app/image-minify');

var fakePath = '/my/fake/path.zip';
var fixture = './test/fixtures/pony.';
var exts = ['png', 'jpg', 'jpeg'];

// copy the test image and compare size before and after minification
var testFormat = function(format, done) {
	var originalFile = fixture + format;
	var newFile = fixture + 'min.' + format;
	var originalSize = fs.statSync(originalFile).size;
	fs.copy(originalFile, newFile, function(err) {
		minify(newFile, function(err) {
			var newSize = fs.statSync(newFile).size;
			expect(newSize).to.be.below(originalSize);
			done();
		});
	});
};

describe('image-minify', function() {

	// executed after all the test are finished
	after(function () {
		exts.forEach(function(ext) {
			fs.unlinkSync(fixture + 'min.' + ext);
		});
	});

	// for each extension run a test
	exts.forEach(function(ext) {
		// the test to be ran for each extension
		it('should compress a ' + ext, function(done) {
			testFormat(ext, done);
		});
	});

	// test non existing image
	it('should return an error in the callback if the image does not exist', function(done) {
		minify('lostImage.png', function(err) {
			expect(err).to.be.an.instanceof(Error);
			expect(err.message).to.equal('Image does not exist');
			done();
		});
	});

	// test an invalid extension
	it('should return an error in the callback if not png or jpg', function(done) {
		minify('./test/fixtures/pony.gif', function(err) {
			expect(err).to.be.an.instanceof(Error);
			expect(err.message).to.equal('Image format not supported (accepted formats: png, jpg)');
			done();
		});
	});
});

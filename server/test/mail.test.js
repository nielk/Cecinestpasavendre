'use strict';
var mail = require('../app/mail'),
	chai = require('chai'),
	expect = chai.expect,
	should = chai.should();

var req, res = 'test';

describe('mailer', function() {

	// error: arg is not a string
	it('should return an error in the callback if an argument is not a string', function(done) {
		mail('this is a message', 23, 'oger.alexandre@gmail.com', function(err) {
			expect(err).to.be.an.instanceof(Error);
			expect(err.message).to.equal('one or more arguments are invalid');
			done();
		});
	});

	// error : arg empty
	it('should return an error in the callback if an argument is empty', function(done) {
		mail('', '', '', function(err) {
			expect(err).to.be.an.instanceof(Error);
			expect(err.message).to.equal('one or more arguments are invalid');
			done();
		});
	});

	// sucess
	it('should return no error in the callback if every arguments are OK', function(done) {
		mail('this is a test', 'test', 'oger.alexandre@gmail.com', function(err) {
			setTimeout(function(err){
			should.not.exist(err);
			done();
			},8*1000); // wait 8 seconds
		});
	});
});
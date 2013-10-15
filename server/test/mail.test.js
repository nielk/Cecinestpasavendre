'use strict';
var nodemailer = require('nodemailer'),
	chai = require('chai'),
	sinon = require('sinon'),
	expect = chai.expect,
	mail = require('../app/mail'),
	sendMail;

// fakes the sendMail function
var sendMailStub = function() {
	// stub createTransport to return an object that has a fake sendMail function
	var stub = sinon.stub(nodemailer, 'createTransport', function() {
		return {
			sendMail: function(mailOptions, callback) {
				// stores the mailOptions for further checks
				stub.mailOptions = mailOptions;
				callback();
			}
		};
	});
	return stub;
};

describe('mailer', function() {

	beforeEach(function(){
		sendMail = sendMailStub();
	});

	afterEach(function(){
		sendMail.restore();
	});

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
			// weird chai syntax, disable jshint complaints here
			/* jshint expr:true */
			expect(err).to.be.undefined;
			expect(sendMail.mailOptions.from).to.equal('cecinestpasavendre ✔ <cecinestpasavendre@vlipp.fr>');
			expect(sendMail.mailOptions.to).to.equal('oger.alexandre@gmail.com');
			expect(sendMail.mailOptions.subject).to.equal('test');
			expect(sendMail.mailOptions.html).to.equal('this is a test');
			done();
		});
	});
});
'use strict';
var nodemailer = require('nodemailer');

/**
 * Send an email
 * @param {String} msg - HTML content of the mail
 * @param {String} subject - Subject of the mail
 * @param {String} to - receiver of the mail
 */
var sendMail = function(msg, subject, to, callback) {

	// mail settings
	var smtpTransport = nodemailer.createTransport('SMTP',{
		service: 'Gmail',
		auth: {
			user: 'cecinestpasavendre@gmail.com',
			pass: 'Levlippcestsuper'
		}
	});

	// verify inputs
	var args = [msg, subject, to];

	var invalid = args.some(function(arg) {
		return typeof arg !== 'string' || arg === '';
	});

	if(invalid) {
		callback(new Error('one or more arguments are invalid'));
	} else {
		var mailOptions = {
			generateTextFromHTML: true,
			from: 'cecinestpasavendre ✔ <cecinestpasavendre@vlipp.fr>', // sender address
			to: to, // list of receivers
			subject: subject, // Subject line
			html: msg // html body
		};

		// send mail with defined transport object
		smtpTransport.sendMail(mailOptions, function(err, response){
			callback(err, response);
		});
	}
};

module.exports = sendMail;
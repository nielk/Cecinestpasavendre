nodemailer = require("nodemailer");

// mail settings
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "cecinestpasavendre@gmail.com",
        pass: "Levlippcestsuper"
    }
});

/**
 * Send an email from moderator
 * @param {String} Msg - HTML content of the mail
 * @param {String} Subject - Subject of the mail
 * @param {String} To - receiver of the mail
 * @param {Object} req - the recieved request
 * @param {Object} res - the request being sent
 */
var sendMail = function(msg, subject, to, callback) {

	var cb = function(err, msg){
		if (callback && typeof(callback) === 'function' && err !== null) {
			callback(new Error(msg));
		} else {
			callback();
		}
	};

	// verify inputs
	var args = [msg, subject, to];

	var valid = args.some(function(arg) {
		return typeof arg !== 'string' || arg === '';
	});

	if(valid) {
		cb(new Error(),'one or more arguments are invalid');
	} else {
		var mailOptions = {
			generateTextFromHTML: true,
			from: "cecinestpasavendre ✔ <cecinestpasavendre@vlipp.fr>", // sender address
			to: to, // list of receivers
			subject: subject, // Subject line
			html: msg // html body
		};

		// send mail with defined transport object
		smtpTransport.sendMail(mailOptions, function(error, status){
			callback(error, status);
		});
	}
};

module.exports = sendMail;
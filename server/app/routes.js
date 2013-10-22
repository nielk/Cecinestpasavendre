var schema   = require('./schema'),
	Chose    = schema.Chose,
	fs       = require('fs'),
	crypto   = require('crypto'),
	fs       = require('fs'),
	path     = require('path'),
	minify   = require('./image-minify.js'),
	mail     = require('./mail.js');

// this is the key will be sent in email link
// the password allow only receivers of moderation email
// to acces to the validation page
// so nobody can acces to the validation page without
// the password in params url
// TODO : change this value when the app will be deployed
var password = 'Levlippcestsuper';

// address mail of moderator
var moderator = "oger.alexandre@gmail.com";

/**
 * Returns a JSON of all Choses (to display on index.html)
 * @param {Object} req - the recieved request
 * @param {Object} res - the request being sent
 */
var findAllChoses = function (req,res) {

	var query = Chose.find(function(err, choses) {
		if(err !== null) {
			res.send('error : \n'+err, 500);
		} else {
			// select only validated chose
			query.select('author title content image date').where('valid',true);
			query.exec(function (err,choses) {
				if(err !== null) {
					res.send('query exec failed \n'+err, 500);
				} else {
					// send the JSON of choses to client
					res.status(200).send(choses);
				}
			});
		}
	});
};

/**
 * Insert a new Chose
 * @param {Object} req - the recieved request
 * @param {Object} res - the request being sent
 */
var insertChose = function (req, res) {

	// the image uploaded
	var fileImage = req.files.image;

	// if an image is uploaded then...
	if(req.files.image.name !== '') {
		// generate a hash for image name
		var hash = crypto.createHash('md5').update(fileImage.path).digest('hex');
		// get the extension of image uploaded
		var ext = path.extname(fileImage.path).toLowerCase();
		// new hashed image name
		var imageName = hash + ext;
		// new path of the uploaded image
		var newPath = __dirname + '/uploads/' + imageName;

		// move the uploaded image from temp to uploads directory
		fs.readFile(fileImage.path, function (err, data) {
			fs.writeFile(newPath, data, function (err) {
				if (err) {
					res.send('error : '+ err , 500);
				} else {
				// minify the new image in uploads directory
					minify(newPath, function (err) {
						if(err) {
							res.send('error : minification failed...\n'+err , 500);
						}
					});
				}
			});
		});
	} else {
		// if no image is uploaded then we replace 
		// it with a default img called none.jpg
		imageName = "" + new Date();

		// generate a hash for image name
		var hash = crypto.createHash('md5').update(imageName).digest('hex');
		// get the extension of image uploaded
		var ext = path.extname(imageName).toLowerCase();
		// new hashed image name
		var imageName = hash + ext;
		// new path of the uploaded image
		var newPath = __dirname + '/uploads/' + imageName;

		// move the uploaded image from temp to uploads directory
		fs.readFile(__dirname + '/uploads/default.png', function (err, data) {
			fs.writeFile(newPath, data, function (err) {
				if (err) {
					res.send('error : '+ err , 500);
				} else {
				// minify the new image in uploads directory
		
						if(err) {
							res.send('error : something failed...\n'+err , 500);
						}
					
				}
			});
		});
	}

	// check if inputs from formulaire are safe
	if(validationInputs(req,res) === true) {

		// create our chose with verified inputs
		var newChose = new Chose({
			author: req.body.author,
			email: req.body.email,
			date: new Date(),
			title: req.body.title,
			content: req.body.content,
			image: imageName,
			valid: false
		});

		// save in database the newChose
		newChose.save(function (err) {
			if(err) {
				res.send('error : cannot save object Chose\n'+err , 500);
			} else {

				var result = {
					uploaded: true
				};

				// send an email to the contributor
				var msg = "Votre objet a bien été enregistré. Merci de votre participation ! Vous recevrez un e-mail lorsqu'il sera validé par la rédaction !";
				var subject = "Votre objet est en cours de validation";
				var to = req.body.email;

				mail(msg, subject, to, function(err, status) {
					if(err) {
						result.contributor = false;
					} else {
						result.contributor = true;
					}

					// send an email to the moderator
					msg = "<b>Hello, un nouvel objet a été ajouté ! cliquer ici pour le valider : " +
					"<a href=\"http://cecinestpasavendre.vlipp.fr/valid/" + imageName + "/" + password + "\">cliquer</a></b>";
					subject = "Nouveau contenu à valider";
					to = moderator;

					mail(msg, subject, to, function(err, status) {
						if(err) {
							result.moderator = false;
						} else {
							result.moderator = true;
						}

						if(result.uploaded && result.moderator && result.contributor) {
						// res.send(result, 200);
						result.sucess = 'Image uploadé !';
						res.send(result.sucess, 200);
						} else {
							result.fail = 'Une erreur c\'est produite, l\'image n\'a pas été uploadé';
							res.send(result.fail, 500);
						}
					});
				});

			}
		});
	}
};

/**
 * Check if inputs from formulaire are safe
 * @param {Object} req - the recieved request
 * @param {Object} res - the request being sent
 */
var validationInputs = function (req,res) {

	// sanitize inputs
	req.sanitize('title').escape();
	req.sanitize('content').escape();
	req.sanitize('author').escape();

	// verify users inputs
	req.assert('author', 'required').notEmpty().len(1,64);
	req.assert('email', 'required').notEmpty().isEmail().len(5,40);
	req.assert('title', 'required').notEmpty().len(1,30);
	req.assert('content', 'required').notEmpty().len(10,300);
	req.assert('image', 'required'); // toDO : validation image

	// catch validation errors
	var errors = req.validationErrors();
	if(errors) {
		res.send('Errors : ' + errors + '\n chose cannot be validated', 403);
		return false;
	} else {
		return true;
	}
};

/**
 * Allow you to modify a chose submitted in order to be published
 * @param {Object} req - the recieved request
 * @param {Object} res - the request being sent
 */
var validationChose = function (req,res) {

	// get the password params from url
	var pwd = req.params.pwd;

	// can't acces to the page if password is wrong
	if(pwd === password) {

		// get the imageName var from params url
		var imageName = req.params.imageName;

		// select the objet who match with the imageName
		var query = { image: imageName };

		// send a formulaire with contents of the chose
		Chose.findOne(query, function(err, chose) {
			if(err !== null || chose === null) {
				res.send('error : \n'+err , 500);
			} else {
			res.send('<style>body {background-color: #292927; color: white; font-family: Helvetica;} </style>'+
					'<form method="post" action="/UpdateChose/'+imageName+'/'+pwd+'" style="text-align: center; width: 50%; margin: 0 auto;">'+
					'<h1>Moderation</h1><br />'+
					'Auteur : <input type="text" name="author" value="'+chose.author+'"><br /><br />'+
					'Email : <input type="text" name="email" value="'+chose.email+'"><br /><br />'+
					'Titre : <input type="text" name="title" value="'+chose.title+'"><br /><br />'+
					// '<input type="text" name="content" value="'+chose.content+'"><br />'+
					'Descriptif : <textarea placeholder="Descriptif de votre objet" name="content" rows=6 style="width: 100%"/>'+chose.content+'</textarea><br /><br />'+
					'Supprimer : <input type="checkbox" name="deleted">'+
					'<img src="../../uploads/'+chose.image+'">'+
					'<input type="submit" value="Valider" onclick="" ></form>',200);
			}
		});

	} else  { // pasword wrong
		res.send('Permission refusé', 403);
	}
};

/**
 * Update the new validated chose
 * @param {Object} req - the recieved request
 * @param {Object} res - the request being sent
 */
var updateChose = function(req,res) {

	// get the password params from url
	var pwd = req.params.pwd;

	// can't acces to the page if password is wrong
	if(pwd === password) {

		// get the imageName var from params url
		var imageName = req.params.imageName;

		// select the objet who match with the imageName
		var query = { image: imageName };

		// find the current chose in db
		Chose.findOne(query, function(err, chose){
			if(err){
				res.send('L\'Objet n\'a pas été validé !', 403);
			} else {
				// if checbox 'supprimer' checked then
				if(req.body.deleted === 'on') {
						// delete the current chose
						chose.remove(function(err){
							if(err) {
								res.send('l\'objet n\'a pas été supprimé ! :( \n'+err,403);
							} else {
								res.send('l\'objet a bien été supprimé !',200);
							}
						});
				} else {

					// update the fields of the chose
					// with the eventual new contents...
					chose.author = req.body.author;
					chose.email = req.body.email;
					chose.title = req.body.title;
					chose.content = req.body.content;
					chose.image = imageName;
					// set the chose validated
					chose.valid = true;

					// save the new updated content of the chose
					chose.save(function(err){

						res.send('Objet validé ! <a href="http://cecinestpasavendre.vlipp.fr">retour au site</a>', 200);

						// send email to contributor to notify the new validated content
						var msg = "Bonjour ! L'objet que vous avez posté sur <a href='http://cecinestpasavendre.vlipp.fr'>"+
							"http://cecinestpasavendre.vlipp.fr</a> a été validé ! Vous pouvez le consulter sur "+
							"cette page : <a href='http://cecinestpasavendre.vlipp.fr/contrib.html'>"+
							"http://cecinestpasavendre.vlipp.fr/contrib.html</a>",
							subject = "Votre objet a été validé",
							to = req.body.email;

						mail(msg, subject, to, function(err, status) {
						if(err) {
							res.send(status, 500);
						} else {
							res.send(status, 200);
						}

						});
					});
				}
			}
		});
	} else {
		res.send('Permission refusé', 403);
	}
};
module.exports.updateChose = updateChose;
module.exports.validationChose = validationChose;
module.exports.findAllChoses = findAllChoses;
module.exports.insertChose = insertChose;
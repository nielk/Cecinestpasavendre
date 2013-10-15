var express          = require('express'),
	app              = express(),
	routes           = require('./routes'),
	schema           = require('./schema'),
	expressValidator = require('express-validator');

// prod urls and port with dev fallback
var MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/dev';
var PORT = process.env.PORT || 9999;

// middleware
app.use(express.bodyParser());
app.use(expressValidator());

// static directory for uploaded images
app.use(express.static(__dirname + '/../../public/dist'));
app.use('/uploads', express.static(__dirname + '/uploads'));

// connection to mongodb
schema.connect(MONGO_URL);

// routes
app.get('/chose', routes.findAllChoses); // index
app.post('/chose', routes.insertChose); // get the images
// update the new validated contents
app.post('/UpdateChose/:imageName/:pwd', routes.updateChose);

// acces to the validation page
app.get('/valid/:imageName/:pwd', routes.validationChose);

// start the server
app.listen(PORT);


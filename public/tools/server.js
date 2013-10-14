var express = require('express'),
	app = express();

app.use(express.static(__dirname + '/../dist/'));
app.use(express.bodyParser());

var port = process.env.PORT || 8000;
app.listen(port);
console.log('server listening on port %s', port);

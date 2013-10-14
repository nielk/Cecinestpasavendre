#Nantes Nord WebDoc [![Build Status](https://travis-ci.org/nielk/Cecinestpasavendre.png?branch=master)](https://travis-ci.org/nielk/Cecinestpasavendre)

"Ceci n'est pas à vendre" a website about Nantes Nord residents.

## Server side install
- `cd server`
- `npm install`

Available commands:
- run the tests with `make test`
- code linting with `make jshint`
- code coverage with `make coverage` and check the `reports` folder
- run the server with `node app/app`

## Client side install
- `cd public`
- `npm install`
- `bower install`

Available commands:
- development build : `grunt build-dev`
- production build : `grunt build-prod`
- launch dev server : `node tools/server.js` only serves static content! no backend!
- launch livereload : `grunt watch`
var express = require('express'),
    bodyParser = require('body-parser'),
    port = 8080;

var app = express();

app
    .use(bodyParser())
    .use(express.static('./public'))
    .listen(port);

console.log('Parent App listening on port', port);
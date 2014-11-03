var express = require('express'),
    bodyParser = require('body-parser'),
    port = 8081;

var app = express();

app
    .use(bodyParser())
    .use(express.static('./public'))
    .listen(port);

console.log('Child App listening on port', port);
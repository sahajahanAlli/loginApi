var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var con = require('./api/db/mysqldb');


var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.all('/*', require('./validationlayer/auth').validateHeader);

app.all('/*', require('./router/index'));

app.all('/v1/*', require('./router/index'))

//Start the server
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});
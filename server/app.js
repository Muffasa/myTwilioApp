var path =require('path');
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(path.join(process.cwd(), 'mp3/campain-bank')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};

app.use(allowCrossDomain);
app.use('/', require('./routes/index'));

app.set('port', 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening at http://%s:%s' ,server.address().address, server.address().port);
});

module.exports = app;

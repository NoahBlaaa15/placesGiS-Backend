var http = require('http');
var createError = require('http-errors');
var express = require('express');
var path = require('path');

var app = express();

var server = http.createServer(app);

var indexRouter = require('./routes/index');

app.set('views', path.join(__dirname, 'sites'));
app.set('view engine', 'vash');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = err;
  res.status(err.status || 500);
  res.render('error');
});

server.listen(process.env.PORT || '80');

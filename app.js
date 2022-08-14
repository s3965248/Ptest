var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
 var logger = require('morgan');
const mysql = require('mysql');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test');
var tstRouter = require('./routes/tst');

var app = express();


// connect database 
const connection = mysql.createConnection({
  host : 'localhost',
  user : 'plantr',
  password  :'password',
  database : 'PlantR'
});

connection.connect()

//query database
connection.query("select * from users where email='test@test.com' and password='test'", function(error, results){
    console.log("query response is ", results);
});

connection.end();


// view engine setup
app.set('views', path.join('index', './index'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', indexRouter);
app.get('/users', usersRouter);
app.get('/test', testRouter);
app.get('/tst', tstRouter);
app.get('/edit', function(req, res){
 res.render('edit-form');
});
 

// catch 404 and forward to error handler
app.get(function(req, res, next) {
  next(createError(404));
});

// error handler
app.get(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;

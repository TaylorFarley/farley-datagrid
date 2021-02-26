var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var authRoute = require('./routes/authRoute');
var dataRoute = require('./routes/dataRoute');
var mongoose = require('mongoose');
var app = express();
var mongoDB = process.env.DB;
  
var cors = require('cors')

app.use(cors()) // Use this after the variable declaration

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRoute);
app.use('/data', dataRoute)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
//DB SETUP
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(()=>{console.log('Connected to our DB')});
var db = mongoose.connection;
//DB SETUP

if(process.env.PORT){
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
  



  app.use((req, res, next) => {
    next(createError(404));
  });

  app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
  });
  }

module.exports = app;

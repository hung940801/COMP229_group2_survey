var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// moduela for authentication
let session = require('express-session');
let passport = require('passport');
let passport_local = require('passport-local');
let localStrategy = passport_local.Strategy;
let flash = require('connect-flash');

// connect to mongo, database setup
let mongoose = require('mongoose');
let DB = require('./db')

// point mongoose to the db{"URI"}
mongoose.connect(DB.URI, { useNewUrlParser:true, useUnifiedtopology:true });
//creating an event to let mongo connect to the database
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, "Connect Error: "));
mongoDB.once('open', ()=>{
    console.log("Connected to mongoDB..");
});

var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
var booksRouter = require('../routes/book');
var surveysRouter = require('../routes/survey');
var questionsRouter = require('../routes/question');
const { User } = require('../models/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// setup express session
app.use(session({
    secret: "SomeSecret",
    saveUninitialized: false,
    resave: false
}))
// initialize flash to maintain the error msg
app.use(flash());
// initialize passport

//create user model instance

let userModel = require('../models/user');
let user = userModel.User;
passport.use(user.createStrategy());
// serialize and derealize the user info
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/surveys', surveysRouter);
app.use('/questions', questionsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

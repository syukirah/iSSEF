var express = require('express');
var session  = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var flash    = require('connect-flash');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//////////////////////////
// Added by Harris
//////////////////////////

// configuration ===============================================================
// connect to our database
require('./config/passport')(passport); // pass passport for configuration

// required for passport
app.use(session({
  secret: 'RDTC14973IntegratedSmartServicesPortalISSEF',
  resave: true,
  saveUninitialized: true
} )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes/login.js')(app, passport); // load our routes and pass in our app and fully configured passport


/*
app.use('/about',function(req, res, next) {
  res.render("pages/about");
});

app.use('/signup',function(req, res, next) {
  res.render("pages/signup", {title: 'Registration'});
});

app.use('/signin',function(req, res, next) {
  res.render("pages/signin", {title: 'Login'});
});

app.use('/',function(req, res, next) {
  res.render("pages/index");
});


/*
// Remarks: Testing with Bcrypt v2
var bcrypt = require('bcrypt');
var mySalt = bcrypt.genSaltSync(10);
console.log ('mySalt = ' + mySalt);

var myData = 'Testing123';
var myPass = '$2a$10$.MJwDvOIM8rRFv1kb7pFlet5K7YOr7MHQtP9u/ECuDZw.Go8Bnf9O';
var myOld = '$2a$10$tCaPviLm1YVgpZDXoCTwXO';
var myEnc1 = bcrypt.hashSync(myData, mySalt);
console.log ('Hashed = ' + myEnc1);

var myEnc2 = bcrypt.hashSync(myData, myOld);
console.log ('Hashed = ' + myEnc2);

console.log(bcrypt.compareSync(myData, myEnc1));
console.log(bcrypt.compareSync(myData, myEnc2));

console.log(bcrypt.compareSync(myData, '$2a$10$I/h2APqDdvXp1yTLRZ7x9./1PBZvbJlriZMTAMMhTmTNM/d/pZule'));
console.log(bcrypt.compareSync('Testing123', '$2a$10$I/h2APqDdvXp1yTLRZ7x9./1PBZvbJlriZMTAMMhTmTNM/d/pZule'));
console.log(bcrypt.compareSync(myData, myPass));

// Lets connect to the database
var mysql = require('mysql');
var dbconfig = require('./config');
var myCon = mysql.createConnection(dbconfig.connection);

myCon.query ('USE ' + dbconfig.database);
//myCon.query ('INSERT INTO users(username,password,first_name,last_name,email_address,phone_number,role,company) VALUES(?,?,?,?,?,?,?,?)',
//    ['harris', myEnc1,'Mohammad Harris','Mokhtar','wajacps@gmail.com','0388839443','developer',1], function(err, rows){
//      console.log(err);
//      console.log (rows);
//});

// Remarks: Using the ?? to replace with no quote variables
//          ? for string with quote
myCon.query('INSERT INTO ??(??) VALUES(?)',
    ['users',
      ['username','password','first_name','last_name','email_address','phone_number','role','company'],
      ['ismail',myEnc2,'Ismail','Ibrahim','ismail@tmrnd.com.my','0388888888','developer',1]],
function(err,rows){
  if(err) throw err;
  else console.log ('New row inserted');
});

myCon.end();
*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

var express = require('express');
var path = require('path');
//var mysql      = require('mysql');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended: false});
var app = express();




var about = require('./routes/about');//about page
var catalog = require('./routes/catalog');//catalog page
var newservice = require('./routes/new-service');//new service page



/*
//Initiate mysql connection
var mysqlConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'issefportal'
});


connection  = mysqlConnection.connect(function(err) {

    if ( !err ) {
        console.log("Connected to Mysql");


    }else if ( err ) {
        console.log(err);
    }

});*/



app.use(express.static(path.join(__dirname, 'public')));
app.use('/about', about);//about page
app.use('/catalog', catalog);//my catalog page
app.use('/new-service',newservice);//new service page
app.set('view engine', 'ejs');



// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('pages/index',{ title: 'Test Page - Shikin!' });
});

/*
// catalog page
app.get('/catalog', function(req, res) {
    res.render('pages/catalog');
});

// new service page
app.get('/new-service', function(req, res) {
    res.render('pages/new-service');
});*/

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

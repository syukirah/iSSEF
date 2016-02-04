var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');



// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('pages/index',{ title: 'Test Page - Shikin!' });
});

// about page
app.get('/about', function(req, res) {
  res.render('pages/about');
});

// catalog page
app.get('/catalog', function(req, res) {
    res.render('pages/catalog');
});

// new service page
app.get('/new-service', function(req, res) {
    res.render('pages/new-service');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

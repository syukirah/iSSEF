var express = require('express');
var path = require('path');
var app = express();


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

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

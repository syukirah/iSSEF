var express = require('express');
var router = express.Router();

var mysql_query = require('../db'); //mysql connection



/* GET home page. */
router.get('/', function (req, res) {

    mysql_query("SELECT * FROM service WHERE author = ?",1, function (err, rows) {

        if (!err) {


            var serviceData = rows;

            res.render('pages/catalog',{serviceData: serviceData});

        }
    });

});

module.exports = router;








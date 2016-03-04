/*
* Add, delete, edit and publishing APIs
* Author : Shikin
* */

var express = require('express');
var router = express.Router();
var mysql_query = require('../db'); //mysql connection
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended: false});
var mysql_query = require('../db'); //mysql connection
var jsonParser = bodyParser.json();
var s_id;

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());



/* GET home page. */
router.get('/:id', function (req, res) {

    s_id = parseInt(req.params.id);
    var s_name = "";
    var s_category;
    mysql_query("SELECT * FROM service WHERE service_id = ?", s_id, function (err, rows) {
        if (!err) {

            s_name = rows[0].service_name;

            //get API list for a service
            mysql_query("SELECT * FROM service_api WHERE service = ?", s_id, function (err, rows) {
                if (!err) {

                    var apiData = rows;
                    res.render('pages/api-service', {id: req.params.id, serviceName: s_name, apiData: apiData});


                }
            });


        }

    });


    //res.redirect('/my-service/id=' + mySessionId);

});

/* Add new API. */
router.post("/add", urlEncodedParser, function (req, res) {


    console.log('body: ' + JSON.stringify(req.body));


    var postForm = {
        api_name: req.body.name,
        target_path: req.body.url,
        method: 'get',
        status: 'new',
        service: s_id,
        description: req.body.description

    };

    console.log("From request:" + JSON.stringify(req.body));

    //Insert new API
    mysql_query("INSERT INTO service_api set ?", postForm, function (err, rows) {

        if (!err) {

            console.log("success:" + rows);
            var result = {};
            result.status = true;
            res.json(result);


        }
        else {

            console.log("fail!!!");

        }
    });

});

/* Delete API. */
router.post("/delete", urlEncodedParser, function (req, res) {


    mysql_query("DELETE FROM service_api WHERE api_id = ?", parseInt(req.body.aid), function (err, rows) {

        if (!err) {

            console.log('Deleted selected rows!');
            var result = {};
            result.status = true;
            res.json(result);

        }
        else {

            console.log("Delete record fail!!!");

        }
    });


});

/* Edit API. */
router.post("/edit", urlEncodedParser, function (req, res) {


    mysql_query('UPDATE service_api SET api_name = ?,target_path=?, description=?  WHERE api_id = ?', [req.body.name, req.body.url, req.body.description, req.body.aid], function (err, rows) {

        if (!err) {

            console.log('Updated API!');
            var result = {};
            result.status = true;
            res.json(result);

        }
        else {

            console.log("Update API Fail!");

        }
    });


});

/* Update API. */
router.post("/publish", urlEncodedParser, function (req, res) {

    for (var i = 0; i < req.body.length; i++) {


        mysql_query('UPDATE service_api SET status = ? WHERE api_id = ?', ['review', req.body[i]], function (err, rows) {

            if (!err) {
                console.log('Updated API!');
            }
            else {
                console.log("Update API Fail!");
            }
        });


    }

    var result = {};
    result.status = true;
    res.json(result);


});


module.exports = router;









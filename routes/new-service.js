var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended: false});
var mysql_query = require('../db'); //mysql connection
var jsonParser = bodyParser.json();
var uuid = require('node-uuid');



// Local Variables
var mySessionId;

router.use(bodyParser.text());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));
/* GET create new service page : */
router.get('/', function (req, res) {


    var cID = "";
    var cName = "";
    mysql_query('SELECT * from service_category', function (err, rows) {

        if (!err) {
            var categoryData = rows;
            res.render('pages/new-service', {
                categoryData: categoryData,
                successMessage: req.flash('successMessage'),
                errorMessage: req.flash('errorMessage')
            });


        }
        else {
            console.log('Error while performing Query.');
        }

    });


});

/*
 *@author Shikin
 *Submit crete new service form
 */

router.post("/", urlEncodedParser, function (req, res) {

    if (req.url != "/favicon.ico") {

        if (req.body.next == "Next") {
            res.redirect('/my-service/' + mySessionId);
        }

        //service(ServiceName, Version, Category, Provider, ImageName, ServiceStatus, Description, Author)
        if (req.body.submit == "Submit") {

            mysql_query("SELECT * FROM company WHERE company_id IN (Select company FROM users WHERE user_id = ?)", 1, function (err, rows) {

                if (!err) {

                    var s_uuid = uuid.v4();
                    var folder_name = rows[0].name+"_"+s_uuid.substring(1,8);
                    var unirest = require('unirest');
                    unirest.put('http://10.44.39.85:3000/control')
                        .header('Content-Type', 'application/json')
                        .send({"control": "createservice", "node_red_home": "/tmp/"+folder_name})
                        .end(function (response) {

                            var body = req.body;
                            var s_name = body.service_name;
                            var s_version = "1.0";
                            var s_category = body.service_category;
                            var s_company = rows[0].company_id;
                            var s_description = body.service_description;
                            var s_author = 1;
                            var s_status = "new";
                            var s_image = "images/smart_parking_cyberjaya.png";
                            var s_date = new Date();
                            var result = (JSON.stringify(response.body.port));
                            var s_port = result.substr(1, 4);
                            var s_ip = 'http://10.44.39.85';
                            var s_id = s_uuid;







                            unirest.put('http://10.44.39.85:3000/control')
                                .header('Content-Type', 'application/json')
                                .send({
                                    "control": "start",
                                    "node_red_app": "node-red",
                                    "name":s_id,
                                    "node_red_home": "/tmp/"+folder_name
                                })
                                .end(function (response) {


                                });

                            var postForm = {
                                service_name: s_name,
                                version: s_version,
                                category: s_category,
                                description: s_name,
                                author: s_author,
                                company: s_company,
                                start_date: s_date,
                                image_path: s_image,
                                service_status: s_status,
                                port: s_port,
                                ip_address: s_ip,
                                flow_id:s_id,
                                flow_folder:folder_name
                            };



                            mysql_query("INSERT INTO service set ?", postForm, function (err, rows) {

                                if (!err) {

                                    // Store variable
                                    mySessionId = rows.insertId;


                                    console.log(rows);
                                    req.flash('successMessage', '<strong>Success!</strong> New service has been created successfully.');
                                    return res.redirect('/new-service');

                                }

                                else
                                {
                                    console.log('Error while performing Query.');
                                }




                                req.flash('errorMessage', '<strong>Error!</strong> A problem has been occurred while creating your new service.');

                                return res.redirect('/new-service');



                            });


                        });


                }


                else {
                    //callback(err, null);
                    console.log('Error while performing Query :' + err);
                    req.flash('errorMessage', '<strong>Error!</strong> A problem has been occurred while creating your new service.');
                    return res.redirect('/new-service');
                }

            });


        }
    }

});



module.exports = router;




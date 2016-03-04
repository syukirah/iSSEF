var express = require('express');
var router = express.Router();
var mysql_query = require('../db'); //mysql connection

/* GET home page. */
router.get('/:id', function (req, res) {


    var s_id = parseInt(req.params.id);


    mysql_query("SELECT * FROM service WHERE service_id = ?",s_id, function (err, rows) {

        if (!err) {


            //var f_url = "http://10.44.39.85";
            //var f_port ="1882";
            var f_port = rows[0].port;
            var f_url = rows[0].ip_address;


            flow_url = f_url + ":" + f_port;



            res.render('pages/flow-service', {id: req.params.id});

            //console.log("ewgdywg"+rows[0].service_id)
            //console.log("TYPE"+ typeof (req.params.id));

        }

        });

});

module.exports = router;








/**
 * Created by wajac on 25/2/2016.
 */
var express = require('express');
var path = require('path');
var router = express.Router();
var async = require("async");
var mysql = require('mysql');
var dbconfig = require('../config/config');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);


router.get('/users/list',function(req, res, next) {
//    res.send('Later we will provide the list of table');
    connection.query("SELECT * FROM users", function(err, rows) {
        if(err)
        {
            console.log (err);
            return done(err);
        }

        if(!rows.length)
        {
            console.log ("Table users is EMPTY");
            res.send("Table users is EMPTY");
        }

        var outcome = '';
        async.each (rows, function(item){
            outcome +=
                '<tr>' +
                    '<td>' + item.first_name + ' ' + item.last_name + '</td>' +   // Fullname
                    '<td>' + item.username + '</td>' +   // Username
                    '<td>' + item.email_address + '</td>' +      // Email
                    '<td>' + item.phone_number + '</td>' +     // Mobile
                    '<td>' + item.role + '</td>' +       // Role
                    '<td>' +
                        '<div class="btn-group">' +
                            '<a class="btn btn-primary" href="#"><i class="icon_plus_alt2"></i></a>' +
                            '<a class="btn btn-success" href="#"><i class="icon_check_alt2"></i></a>' +
                            '<a class="btn btn-danger" href="#"><i class="icon_close_alt2"></i></a>' +
                        '</div>' +
                    '</td>' +     // Action
                '</tr>';

        }, function(err){
            console.log (err);
            res.send ("ERROR: " + err);
        });

        res.send (outcome);
    });


});

module.exports = router;
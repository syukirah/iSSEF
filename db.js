//Dependencies
var mysql      = require('mysql');

/*
 * @author Shikin
 * @sqlConnection
 * Creates the connection, makes the query and close it to avoid concurrency conflicts.
 */
var sqlConnection = function sqlConnection(sql, values, next) {

    // It means that the values has not been passed
    if (arguments.length === 2) {
        next = values;
        values = null;
    }

    //SSH Connection
    //ssh -L 3306:127.0.0.1:3306 10.44.39.115 -lissef
    /*
    var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        password : '',
        database : 'issefportal2'
    });*/

    //local connection
    var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        password : '',
        database : 'issefportal2'
    });

    connection.connect(function(err) {

        if ( !err ) {
            console.log("Connected to  new Mysql");


        }else if ( err ) {
            console.log("[MYSQL] Error connecting to mysql:" + err+'\n');
        }

    });

    connection.query(sql, values, function(err) {

        connection.end(); // close the connection

        if (err) {
            throw err;
        }

        // Execute the callback
        next.apply(this, arguments);
    });

}
module.exports = sqlConnection;





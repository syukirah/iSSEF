/**
 * Created by wajac on 4/3/2016.
 */
'use strict';

module.exports = function(app, passport) {
    app.get('/portal',function(req, res) {
        if(req.isAuthenticated()) {
            console.log ('Username: ' + req.user.username);
            res.render('portal');
        }
        else res.render('index');
    });

    app.get('/catalog',function(req, res) {
        if(req.isAuthenticated()) {
            res.render('catalog');
        }
        else res.render('index');
    });

    app.get('/administration',function(req, res) {
        if(req.isAuthenticated()) {
            res.render('administration');
        }
        else res.render('index');
    });
}
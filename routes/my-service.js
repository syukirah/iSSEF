var express = require('express');
var router = express.Router();

//var id= req.router.get('id');

/* GET home page. */
router.get('/:id', function (req, res) {

    res.render('pages/my-service', {id: req.params.id});
    //res.redirect('/my-service/id=' + mySessionId);

});

module.exports = router;









var express = require('express');
var router = express.Router();
// var test = require('../models/insert_test');
var test = require('../models/test');

router.get('/',function(req,res,next) {
    // test.deleteOne({
    //     "name":"ffffff"
    // },function(err){
    //     console.log(err);
    // });
    // res.render('test',{name:"hello"});
    // test.findSort();
    // res.render('test');
    // test.findLimit({
    //     skip: 1,
    //     limit: 4
    // }, function (err, result) {
    //     console.log(result);
    // });
    test.lookup(function(err,result){

    });
});
module.exports = router;
var express = require('express');
var router = express.Router();
var test = require('../models/test');

//调用路由方法

/* GET home page. */
router.get('/', function(req, res, next) {
  // test.insertMany([{
  //   "name":"1",
  //   "email":"dfghfa",
  //   "age":"15"
  // },
  // {
  //   "name":"23",
  //   "email":"fghjkl",
  //   "age":"88"
  // }],function(err,number){
  //   console.log(err);
  // });
  // test.findAll(function(err,test){
  //   console.log(test);
  // });
  test.findWhere({
      "name":"1111"
  },function(err,test){
    console.log(test);
  });

  test.updateOne()
  res.render('index', { title: 'Express' });
  //此处的index指的是view里的index.pug
});

module.exports = router;

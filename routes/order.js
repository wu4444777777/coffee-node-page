var express = require('express');
var router = express.Router();
var cart = require("../models/cart");
//调用路由方法
/* GET home page. */
router.get('/', function(req, res, next) {
    var proId = req.query.id;
    cart.findWhere({
        "id" : proId
    },function(err,result){
        res.render('order',{cart:result});
    });
});
module.exports = router;

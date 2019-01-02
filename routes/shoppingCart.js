var express = require('express');
var router = express.Router();
var cart = require('../models/cart');
//调用路由方法

/* GET home page. */
router.get('/', function(req, res, next) {
    cart.findAll(function(err,result){
        res.render("shoppingCart",{cart:result})
    })
});
router.post('/delOne',function(req,res){
    var name = req.body.name;
    console.log(name);
    cart.deleteOne({
        "name":name
    },function(err,result){
        res.render("shoppingCart",{cart:result});
    })
});
// router.post('/delMany',function(req,res){
//     cart.deleteMany({
//         "name":name
//     },function(err,result){
//         res.render("shoppingCart",{cart:result});
//     })
// });
module.exports = router;

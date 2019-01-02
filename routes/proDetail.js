var express = require('express');
var router = express.Router();
var detail = require('../models/find');
var cart = require('../models/cart');
//调用路由方法

/* GET home page. */
router.get('/', function(req, res, next) {
    var proId = req.query.id;
    detail.findWhere({
        "id" : proId
    },function(err,result){
        res.render('proDetail',{list:result});
    });
});
router.post('/add',function(req,res) {
    if(req.body!=null){
        cart.distinct({
             "id" : req.body.id,
             "image" : req.body.image,
             "name" : req.body.name,
             "price" : req.body.price,
             "num" : req.body.num
        },function(result){

            if(result != null && result != undefined) {
                if(result.isSuccess == 1){
                    res.redirect('page');
                }else{
                    if(result.err != null){
                        req.flash("error",result.err);
                        console.log(result.err);
                        // return false;
                    }
                }
            }else{
                req.flash("error","加入购物车失败");
            }
        })
    }
    // cart.insertOne({
    //     "id" : req.body.id,
    //     "image" : req.body.image,
    //     "name" : req.body.name,
    //     "price" : req.body.price,
    //     "num" : req.body.num
    // }, function (err,result) {
    //     res.render("proDetail",{list:result});
    //     console.log(result);
    // });
});
module.exports = router;

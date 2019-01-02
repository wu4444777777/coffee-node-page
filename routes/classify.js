var express = require('express');
var router = express.Router();
var classify = require('../models/classify');
//调用路由方法

/* GET home page. */
router.get('/', function(req, res, next) {
    classify.findWhere({
        "type" : req.query.type
    },function(err,result){
        res.render('classify',{pro:result});
    });
});

router.post('/postAjax',function(req,res){
    if(global.isFlag != 1){
        global.isFlag = 1;
        classify.findPage({
            type:req.body.type
        },req.body.skip,function(result){
            global.isFlag = 0;
            res.json(result.info);
        });
    }else{
        res.json(null);
    }
});
module.exports = router;
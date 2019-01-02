var express = require('express');
var router = express.Router();
var user = require('../models/page');
//调用路由方法
/* GET home page. */
router.get('/', function(req, res, next) {
    user.findWhere({
        "prior":"1"
    },function(err,result){
        res.render('page',{ result:result});
    });
    // res.render('page', { title: 'Express' });
    // //此处的index指的是view里的index.pug
});
router.post('/postAjax',function(req,res){
    user.findPage(req.body.skip,function(result){
        res.json(result.info);//返回给客户端的数据，以json格式传给服务端
        //将从服务端获得信息传给客户端
    })
});
module.exports = router;

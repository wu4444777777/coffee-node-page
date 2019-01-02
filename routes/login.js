var express = require('express');
var router = express.Router();
var login = require('../models/login');
// var content = require('../models/page');
//调用路由方法

// /* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Express' });
    //此处的index指的是view里的index.pug
});
//可以出现多个get或是post方法，但第一个参数必须不同
//test.findOne就是在test文件里的方法
router.post('/',function(req, res){
    login.findOne({
        "username":req.body.user,
        "password":req.body.pass
    },function(err,test){
        if(test == undefined){
            req.flash('error','用户名密码不正确！');
            return res.redirect('login');
        }else{
            global.username =req.body.user;
            req.flash('info','登陆成功！');
            return res.redirect('page');
        }
    });
    // content.findAll(function(err,result){
    //     res.render('page',{result:result});
    // });
});
module.exports = router;

var express = require('express');
var router = express.Router();
var user = require('../models/register');
router.get('/',function(req,res,next){
    res.render('register',{});
});
router.post('/',function(req,res){
    if(req.body != null){
        user.register({
            "username":req.body.user,
            "password":req.body.password,
            "secPass":req.body.secPass,
            "telephone":req.body.telephone,
            "email":req.body.email,
            "qq":req.body.qq
        },function(result){
            if (result != null && result != undefined){
                if(result.isSuccess == 1){
                    res.redirect('page');
                }else{
                    if(result.error != null){
                        req.flash("error",result.error);
                        return false;
                    }else{
                        req.flash("error","用户注册失败，请稍后重试！");
                    }
                    res.redirect("register");
                }
            }else{
                req.flash("用户注册失败，请稍后重试！");
                res.redirect("register");
            }
        })
    }
});
module.exports = router;
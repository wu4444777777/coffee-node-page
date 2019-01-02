$(".tipbox").hide();

function check(form){
    var flag = true;
    var user = form.user.value;
    var password = form.password.value;
    var secPass = form.secPass.value;
    var telephone = form.telephone.value;
    var email = form.email.value;
    var qq = form.qq.value;

    if(user != null ){
        if(user.length < 4 || user.length > 16){
            $("#userError").show().html("用户名不符合规范(3-16位),请重输！");
            flag = false;
        }
    }else{
        $("#userError").show().html("用户名不能为空！");
        flag = false;
    }
    //密码
    var passPatt = /^[a-zA-Z]\w{5,17}$/;
    if(!passPatt.test(password)){
        $("#passError").show().html("密码格式不对，请重输！");
        flag = false;
    }else if(password != secPass){
        $("#secError").show().html("两次密码输入不一致");
        flag = false;
    }

    //手机
    var phonePatt = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    if(!phonePatt.test(telephone)){
        $("#phoneError").show().html("手机格式不对");
        flag = false;
    }
    //邮箱
    var emailPatt = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    if(!emailPatt.test(email)){
        $("#emailError").show().html("邮箱格式不对");
        flag = false;
    }
    //qq
    var qqPatt = /^[1-9][0-9]{4,10}$/;
    if(!qqPatt.test(qq)){
        $("#qqError").show().html("qq格式不对");
        flag = false;
    }
    $("#username").focus(function(){
        $(".tipbox").hide();
    });
    return flag;
}
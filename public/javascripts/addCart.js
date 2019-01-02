$(function(){
    var searchUrl = window.location.search.substring(1,window.location.search.length);
    var id = searchUrl.split("=")[1];
    var name = document.getElementById("proName").innerHTML;
    var price = (document.getElementById("price1").innerHTML).substring(1);
    var image = (document.getElementById("proImg").currentSrc).substring(22);
    $("#add").click(function(){
        var num = document.getElementById("ipt").value;
        $.ajax({
            type:"post",
            url:"/proDetail/add",
            data:{
                id:id,
                image:image,
                name:name,
                price:price,
                num:num
            },
            success:function(data){
                console.log(data);
            },
            error:function(error){
                console.log(error);
            }
        });
    })
});



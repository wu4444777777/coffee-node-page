$(function(){
    var skip = 4 ;
    var showHtml = "";
  $("#nextPage").click(function(){
      $.ajax({
          type:"post",//http的请求类型
          url:"/page/postAjax",//请求地址
          data:{//传输给服务端的数据
              skip:skip
          },
          //success和error对应两个回调函数
          success:function(data){
              for(var o of data){
                 showHtml += "<a href=\"#\">" +
                     "<img src="+o.image+"></a>"
             }
             //显示图片的位置
             $("#showNextPage").html(showHtml);
          },
          error:function(error){
              console.log(error);
          }
      });
      skip += skip;
  })
});
//post
$(function(){
    var skip = 4 ;
    // var showHtml = "";
    $("#nextPage").click(function(){
        $.post(
            "postAjax",
            {skip:skip},
            function(data){
                console.log(data);
            },
            "json");
        skip += skip;
    })
});

//get
$(function(){
    var skip = 4 ;
    // var showHtml = "";
    $("#nextPage").click(function(){
        $.get(
            "postAjax",
            {skip:skip},
            function(data){
            console.log(data);
            },
            "json");
        skip += skip;
    })
});

//put用于新增数据
$(function(){
    var skip = 4 ;
    var showHtml = "";
    $("#nextPage").click(function(){
        $.put({
            type:"post",//http的请求类型
            url:"/page/postAjax",//请求地址
            data:{//传输给服务端的数据
                skip:skip
            },
            //success和error对应两个回调函数
            success:function(data){
                for(var o of data){
                    showHtml += "<a href=\"#\">" +
                        "<img src="+o.image+"></a>"
                }
                //显示图片的位置
                $("#showNextPage").html(showHtml);
            },
            error:function(error){
                console.log(error);
            }
        });
        skip += skip;
    })
});
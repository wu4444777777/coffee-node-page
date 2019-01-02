$(function () {
    var skip = 6;
    var range = 20;             //距下边界长度/单位px
    var maxnum = 10;            //设置加载最多次数
    var num = 1;
    var totalheight = 0;
    //主体元素
    var searchUrl = window.location.search.substring(1,window.location.search.length);
    var type = searchUrl.split("=")[1];
    $(window).scroll(function () {
        var showHtml = "";
        var scrollPos = $(window).scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)
        totalheight = parseFloat($(window).height()) + parseFloat(scrollPos);
        if (($(document).height() - range) <= totalheight && num != maxnum) {
            $.ajax({
                url: "/classify/postAjax",
                type: 'post',
                dataType: 'json',
                data: {
                    skip:skip,
                    type:type
                },
                success: function (data) {
                    for (var o of data) {
                        showHtml += "<div class=\"proMod\">\n" +
                            "<a href='proDetail?id="+o.id+"'>" +
                            "<img src='"+o.image+"' alt=\"\"></a>" +
                            "<a href='proDetail?id="+o.id+"'>" +
                            "<span class=\"proName\">" + o.name + "</span></a>" +
                            "<span class=\"price\">" + o.price + "</span>" +
                            "</div>";
                    }
                    $('#proTr').append(showHtml);
                    num++;
                },
                error: function (error) {
                    console.log(error);
                }
            });
            skip += skip;
        }
        else if (($(document).height() - range) >= totalheight && num == maxnum) {
            $(".warn").html("已经到底了");
        }
    });
});






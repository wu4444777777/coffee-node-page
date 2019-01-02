$(function(){
    $(window).bind("scroll",function(){
        var sTop = $(window).scrollTop();
        var sTop = parseInt(sTop);
        if (sTop <= 100) {
            if (!$(".top").is(":visible")) {
                try {
                    $(".top").slideDown("fast");
                } catch (e) {
                    $(".top").show();
                }
            }
        }
        else {
            if ($(".top").is(":visible")) {
                try {
                    $(".top").slideUp("fast");
                } catch (e) {
                    $(".top").hide();
                }
            }
        }
    });
});
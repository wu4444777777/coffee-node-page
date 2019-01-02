$(function(){
    var price = ($("#price")[0].innerText).substring(1);
    var num = $("#num")[0].innerText.substring(1);
    var total = 0;
    total = (parseFloat(price)*parseInt(num)).toFixed(2);
    $(".price").html(total);
})
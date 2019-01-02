function deleteOne(index){
    // $("#del"+index).click(function(){
        name = document.getElementById("del"+index).parentNode.parentNode.childNodes[0].childNodes[0].innerText;
        console.log(name);
        $.ajax({
            type:"post",
            url:"/shoppingCart/delOne",
            data:{
                name:name
            },
            success:function(data){
                // $("#pro"+index).parent().remove();
                $("#product"+index).remove();
            },
            error:function(error){
                console.log(error);
            }
        })
    // })
}

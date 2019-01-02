// proTotal = document.getElementById("proNum");
function changeNum(iptId,flag){
    var tom=document.getElementById(iptId);
    if(flag=='add'){
        tom.value++;
    }
    if(flag=='minus'){
        if (tom.value > 1) {
            tom.value=tom.value-1;
        }
    }
    getSubTotal(tom.parentNode.parentNode.parentNode.parentNode.id);
    productCount();
}

//全选
function selectSingle(iptId){
    checkInputs = document.getElementsByName("singleCheck");
    var checkAllInputs = document.getElementById('allCheck');
    var proSelect = document.getElementById(iptId).value;
    var count=0;
    for(var i=0;i< checkInputs.length;i++){
        if(checkInputs[i].checked) {
            count++;
        }
        if (count === checkInputs.length ) {//判断是否全选
            checkAllInputs.checked = true;
            selectAll();
        } else {
            checkAllInputs.checked=false;
        }
    }
    // proTotal.innerHTML = parseInt(proTotal.innerHTML) + parseInt(proSelect);
    productCount();
}
function selectAll(){
    var checkInputs = document.getElementsByName("singleCheck");
    var checkAllInputs = document.getElementById('allCheck');
    for(var i=0;i< checkInputs.length;i++){
        checkInputs[i].checked=checkAllInputs.checked;
    }
    productCount();
    $("#del").click(function(){
        $.ajax({
            type:"post",
            url:"/shoppingCart/delMany",
            data:{},
            success:function(data){
                $("#product").remove();
            },
            error:function(error){
                console.log(error);
            }
        })
    })
}

//小计
function getSubTotal(tr){
    tds=document.getElementById(tr);
    var price = parseFloat((tds.cells[2].childNodes[0].childNodes[1].innerText).substring(1)).toFixed(2);//获取价格
    var count = parseFloat(tds.cells[2].childNodes[0].childNodes[2].childNodes[1].value);//获取数量
    SubTotal = price * count;
    // document.getElementById("price").innerHTML = "￥"+ SubTotal.toFixed(2);//四舍五入
}

function productCount(){
    var checkAllInputs = document.getElementById('allCheck');
    var checkInputs = document.getElementsByClassName("check");
    for(var j = 0;j < checkInputs.length;j ++){
        var tableTr=document.getElementById("product"+j).getElementsByTagName("tr");
        var total=0;      //所有商品的总计
        console.log(tableTr);
        if(tableTr.length==3){
            checkAllInputs.checked=false;
        }
        // var checkInputs = document.getElementsByName("singleCheck");
        for(var i=0;i< checkInputs.length;i++){
            var price=0;     //每一行商品的单价
            var nums=0;    //每一行商品的数量

            if(checkInputs[i].checked) { //判断复选框是否被选中
                var c = checkInputs[i].parentNode.parentNode;
                price = (c.childNodes[2].childNodes[0].childNodes[1].innerText).substring(1);  //选中行商品的单价
                nums = c.childNodes[2].childNodes[0].childNodes[2].childNodes[1].value; //选中行商品的数量()
                total += price*nums;//所有商品的总计的和 = 每一个商品的单价 x 数量   相加
                // c.childNodes[9].innerHTML = (price*nums).toFixed(2);  //商品小计 =商品的单价 x 数量
            } else {
                total += 0;
            }
        }
    }
    document.getElementById("total").innerHTML = total.toFixed(2);
}

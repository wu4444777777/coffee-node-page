//按钮加减
function changeNum(flag) {
    var tom = document.getElementById("ipt");
    if (flag == 'add') {
        tom.value++;
    }
    if (flag == 'minus') {
        if (tom.value > 1) {
            tom.value = tom.value - 1;
        }
    }
}
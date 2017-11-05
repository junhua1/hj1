/**
 * Created by hua on 2017/11/3.
 */
function getHistory(){
    var cat_history = localStorage.getItem("leTaoHistory");
    var arr = JSON.parse(cat_history);
    return arr;
}

//1.进入这个页面先把历史记录从localstorage中取出来,然后渲染到页面上
function render(){
    var arr = getHistory();
    $(".lt_history").html(template("tpl",arr));
}

render();

//2.点击清空按钮删除全部记录
$(".lt_history").on("click",".icon_empty",function () {
    var his = localStorage.removeItem("leTaoHistory");
    render();
});

//3.点击删除按钮删除该条记录
$(".lt_history").on("click",".fa-close",function () {

    //2. 获取到当前按钮的自定义属性 data-index
    var arr = getHistory();
    var index = $(this).data("index");
    arr.splice(index,1);
    localStorage.setItem("leTaoHistory",jSON.stringify(arr));
    render();
});


//4.点击搜索按钮记录出现在搜索记录地址下,并且跳转 这边需要注意需要把搜索的值传到搜索栏下面

$(".search_btn").on("click",function () {
    var arr = getHistory();
    var val = $(".search_text").val();
    if(val === ""){
        mui.alert(".....");
        return;
    }
    var index = arr.indexOf(val);
    if(arr.indexOf(val) > -1){
        arr.splice(index,1);
    }
    
    if(arr.length > 10){
        arr.pop(arr.length - 1);
    }
    arr.unshift(val);
    localStorage.setItem("leTaoHistory",JSON.stringify(arr));
    
    location.href = "searchList.html?val="+val;
})


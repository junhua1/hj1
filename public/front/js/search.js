/**
 * Created by hua on 2017/11/1.
 */
mui(".mui-scroll-wrapper").scroll({
    indicators:false
});


//思路：
//1. 输入关键字，点击按钮，跳转到搜索列表页。
//2. 需要把关键字保存到web缓存中（cookie sessionStorage localStorage）
// 2.1 要求：最多存10条
// 2.2 如果超过了10条，需要删除最早的那条
// 2.3 如果发现搜索记录是重复，需要把该条搜索记录放到最上面。


//2. 点击清空按钮吗，需要把搜索记录对应的缓存清除。
//3. 点击删除的时候，需要删除单条记录
//4. 点击单条记录，可以直接跳转到对应的搜索详情页。


//获取缓存中的数据,转换成数组,返回
function getHistory() {
    var search_history = localStorage.getItem("leTaoHistory") || "[]";

    var arr = JSON.parse(search_history);
    console.log(localStorage);

    return arr;
}

function render() {
    var arr = getHistory();
    console.log(arr);
    //模版第二个参数：必须是对象，因为在模版中是直接通过对象的属性来获取。
    $(".lt_history").html( template("tpl",{arr:arr}) );
}

render();

//清空功能
//思路：
//1. 给按钮注册点击事件（委托）
// 2.删除lt_search_history,重新渲染

$(".lt_history").on("click",".icon_empty",function(){
    //删除lt_history的缓存
    localStorage.removeItem("leTaoHistory");

    render();
});

//删除功能思路：
//1. 点击删除按钮，（委托事件）
//2. 获取到当前按钮的自定义属性 data-index
//3. 获取缓存中的数据，  把data-index对应的那条记录删除
//4. 把这个数组重新存储到缓存中
//5. 重新渲染

$(".lt_history").on("click",".fa-close",function () {
    console.log(2);
    var index = $(this).data("index");
    var arr = getHistory();
    //数组如何删除某一项  push unshift pop shift  slice(原数组不变)  splice()
    arr.splice(index,1);
    localStorage.setItem("leTaoHistory",JSON.stringify(arr));
    render();
})


//添加功能
//1. 注册点击事件
//2. 获取文本框中的value值，判断如果没有输入关键字，给用户一个提示
//3. 需要把这个value值存储到缓存中
//4. 页面需要跳转到搜索详情页-  把关键字带过去

$(".search_btn").on("click",function () {
    console.log(1);
    var val = $(".search_text").val().trim();
    // if(val === ""){
    //     mui.alert("说话,不然你点个鸡儿")
    //     return;
    // }

    //把value值存储到缓冲中
    //1. 先从缓存中把数组获取到
    var arr = getHistory();
    //如果数组中已经存在了这条记录，删除这条记录，把val存到第一条
    //如果数组的长度>=10,删除最后一条，把val存在第一条
    //把val存到第一条
    //获取val在arr中的索引,如果索引是-1，说明没有
    if(arr.indexOf(val) > -1){
        //说明存在这条记录
        arr.splice(index,1);
    }
    //如果数组的长度>=10，也需要删除最后一条
    if(arr.length > 10){
        arr.pop();
    }
    //把val存到数组的第一条
    arr.unshift(val);

    //存储到缓存中
    localStorage.setItem("leTaoHistory",JSON.stringify(arr));
    // render()
    location.href = "searchList.html?val"+val;
})
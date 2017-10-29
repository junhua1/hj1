/**
 * Created by hua on 2017/10/29.
 */
//希望在ajax调用之前start
//在ajax调用结束后执行done

//校验用户是否登录的功能
//路径中，并没有login.html

if(location.href.indexOf("login.html") < 0){
    $.ajax({
        type:"get",
        url:"/employee/checkRootLogin",
        success:function (data) {
            if(data.error === 400){
                //说明用户没有登录，跳转到登录页面
                location.href = "login.html";
            }
        }
    })
}

$(document).ajaxStart(function () {
    //让进度条显示出来
    NProgress.start();
});

$(document).ajaxStop(function () {
    setTimeout(function () {
        NProgress.done();
    },500);
});

//点击分类管理，显示或者隐藏二级分类

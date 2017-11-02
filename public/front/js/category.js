/**
 * Created by hua on 2017/11/1.
 */
var sc = mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators:false
});

// 如果有多个 dom对象调用他时,返回值是一个数组


//渲染一级页面
$.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    success:function (data) {
        console.log(data);
        $(".lt_category_l .mui-scroll").html(template("tpl",data));
        renderSecond(data.rows[0].id);
    }
});


function renderSecond(id) {
    $.ajax({
        type:"get",
        url:"/category/querySecondCategory",
        data:{id:id},
        success:function (data) {
            console.log(data);
            $(".lt_category_r .mui-scroll").html(template("tpl2",data));
        }
    })
}

$(".lt_category_l ul").on("click","li",function () {
    var id = $(this).data("id");
    $(this).addClass("now").siblings().removeClass("now");
    renderSecond(id);
});

sc[0] = mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators:false
});

sc[1] = mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators:false
});


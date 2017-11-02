/**
 * Created by hua on 2017/11/2.
 */
$(function () {
    mui(".mui-scroll-wrapper").scroll({
        indicators: false
    });

    //思路：
    //1. 获取地址栏的参数，设置到文本框中.
    //2. 通过地址栏的参数，去查询商品，把商品渲染到页面中。
    //3. 点击搜索按钮，获取搜索框中的value值，查询商品，渲染到页面.
    //4. 点击排序，需要对商品进行排序。
    //5. 添加一个遮罩效果
    var data = {
        proName: '',
        brandId: '',
        price: '',
        num: '',
        page: 1,
        pageSize: 10
    };

    //需要发送ajax请求，去后端获取数据  page pageSize proName
    function render(data) {
        $.ajax({
            type:"get",
            url:"/product/queryProduct",
            data:data,
            success: function (data) {
                console.log(data);
                setTimeout(function () {
                    $(".lt_product").html( template("tpl",data) );
                },1000)
            }
        })
    }

    var val = tools.getParam("val");
    $(".search_text").val(val);
    data.proName = val;
    render(data);

    //点击搜索按钮，
    $(".search_btn").on("click",function () {
        //把所有的a的row样式清掉,同时,把两个排序也清掉
        $(".lt_sort a").removeClass("now");
        $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
        data.price = '';
        data.num = '';


        ////获取用户输入的内容
        var val = $(".search_text").val().trim();

        $(".lt_product").html('<div class="loading"></div>');

        data.proName = val;
        render(data);
    });
    
    // 排序功能
    $(".lt_sort>a[data-type]").on("click",function () {
        //如果当前a标签有now， 切换span的箭头
        //如果当前a标签没有now， 给当前a标签加上now，同时清除其他a的now,  还需要把其他a标签的箭头都向下即可。

        var $this = $(this);
        var $span = $(this).find("span");

        if($this.hasClass("now")) {
            if($span.hasClass("fa-angle-down")){
                $span.removeClass("fa-angle-down").addClass("fa-angle-up");
            }else{
                $span.addClass("fa-angle-down").removeClass("fa-angle-up")
            }
            // $span.toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        }else{
            //a 没有now
            $this.addClass("now").siblings().removeClass("now");
            $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
            
        }

        //判断是那个顺序
        var type = $this.data("type");
        var value = $span.hasClass("fa-angle-down") ? 2:1;
        //在传参数之前让price 和 num 这两个参数为空,这样只会有一个参数传过去,后台才能判断传回来值;
        data['price'] = "";
        data['num'] = "";
        //设置num或者price,在这个之前需要保证之前的清空;
        data[type] = value;
        render(data);

    })
})
/**
 * Created by hua on 2017/11/3.
 */
var data = {
    proName : '',
    brandId : '',
    price : '',
    num : '',
    page: 1,
    pageSize : 10
};

function render() {
    $.ajax({
        type:"get",
        url: "/product/queryProduct",
        data:data,
        success: function (data) {
            $(".loading").html(template("tpl",data));
        }
    })
}

var val = tools.getParam("val");
data.proName = val;
$(".search_text").val(val);
render(data);

$(".search_btn").on("click",function () {
    $(".lt_sort span").removeClass("now");
    var val = $(".search_text").val();
    $(".lt_product").html('<div class="loading"></div>');
    data.proName = val;
    render(data);
});

$(".lt_sort>a[data-type]").on("click",function(){
    var $this = $(this);
    var $span = $(".lt_sort").find("span");
    
    if(($this).hasClass("now")){
        if($span.hasClass("fa-angle-down")){
            $span.removeClass("fa-angle-down").addClass("fa-angle-up");
        }else{
            $span.removeClass("fa-angle-up").addClass("fa-angle-down");
        }
    }else{
        $this.addClass("now").siblings().removeClass("now");
        $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
    }

    var type = $span.data();
    var val = $span.hasClass("fa-angle-down") ? 2 : 1;

    data.price = '';
    data.num = '';
    data.type = val;
    render(data);
});





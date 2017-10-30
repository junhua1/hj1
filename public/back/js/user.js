/**
 * Created by hua on 2017/10/30.
 */
$(function () {
    //发送ajax请求，获取后台的数据
    var currentPage = 1;
    var pageSize = 5;

    //去后台获取数据，拿的currentPage页的数据
    function render() {
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function (data) {
                console.log(data);
                var html = template("tpl",data);
                $("tbody").html(html);

                //分页功能
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:currentPage,
                    size: "small",
                    //向上取整
                    totalPages: Math.ceil(data.total/data.size),
                    onPageClicked:function(event, originalEvent, type,page){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }
    render();

});
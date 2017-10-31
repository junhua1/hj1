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

    $("tbody").on("click",".btn",function () {
        // console.log(1);
        var id = $(this).parent().data("id");
        var isDelete = $(this).parent().data("is-delete");
        console.log(id);
        console.log(isDelete);
        isDelete = isDelete === 1 ? 0 : 1;
        //显示模态框
        $("#optionModal").modal("show");


        $('.btn-primary').off().on('click',function () {
            $.ajax({
                type:'post',
                url:'/user/updateUser',
                data:{
                    id:id,
                    isDelete:isDelete
                },
                dataType:'json',
                success:function (data) {
                    if(data.success){
                        $("#optionModal").modal('hide');
                        render();
                    }
                }
            })

        })
    });

});

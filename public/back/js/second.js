/**
 * Created by hua on 2017/10/31.
 */
$(function(){
    var currentPage = 1;
    var pageSize = 5;
    function render() {
        
        //渲染yu分页
        
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data:{
                page: currentPage,
                pageSize:pageSize
            },
            success: function (data) {
                $("tbody").html(template("tpl",data));

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(data.total/pageSize),
                    size: "small",
                    onPageClicked(a,b,c,page){
                        currentPage=page;
                        render();
                    }
                })
                
            }
        })
        
    }
    render();

    //显示模态框

    $(".btn_add").on("click",function () {
        $("#addModal").modal("show");

        //发送ajax请求，获取一级分类的数据，渲染下拉框
        
        $.ajax({
            type:"get",
            url: "/category/queryTopCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },
            success: function (data) {
                
                $(".dropdown-menu").html(template("tpl2",data));
            }
        })
    });

    //点击下拉框，让某个选中
    $(".dropdown-menu").on("click","a",function () {

        //获取到当前a标签的内容，设置给dropdown-text
        $(".dropdown-text").text($(this).text());
    })

    //初始文件上传
    $("#fileupload").fileupload({
        dataType:"json",
        //当文件上传成功时，会执行这个回调函数
        done:function (e, data) {
            //获取文件上传结果
            //给默认图片设置src
            $(".img_box img").attr("src", data.result.picAddr);
        }
    });
    

})
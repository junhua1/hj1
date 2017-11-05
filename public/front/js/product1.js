/**
 * Created by hua on 2017/11/3.
 */
var id = tools.getParam("productId");
 
$.ajax({
    type:"get", 
    url: "/product/queryProductDetail", 
    data: {id:id}, 
    success: function (data) {
        var newArr = [];
        for(var i = data.size.split("-")[0]; i < data.size.split("-")[1]; i++){
            newArr.push(i);
        }
        data.shoeSize = newArr;
        $(".mui-scroll").html(template("tpl",data));
        }
    })

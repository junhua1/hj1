/**
 * Created by hua on 2017/11/1.
 */
//区域滚动效果
mui('.mui-scroll-wrapper').scroll({
    indicators:false
});

//轮播图
mui('.mui-slider').slider({
    interval:1000 // 自动轮播周琦,若为0 不自动播放,默认为0
})
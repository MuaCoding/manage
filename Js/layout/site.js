// 响应式
// $(window).resize(function() // 绑定到窗口的这个事件中
// {	
//     var whdef = 120 / 1920;
//     // 表示1920的设计图,使用100PX的默认值
//     var wH = window.innerHeight;
//     // 当前窗口的高度
//     var wW = window.innerWidth;
//     // 当前窗口的宽度
//     var rem = wW * whdef;
//     // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
//     $('html').css('font-size', rem + "px");
// });

// 轮播切换


(function(){
    (function() {
        500 <= $(window).scrollTop() && $("#scroll-top").fadeIn();
        var a;
        $(window).scroll(function() {
            clearTimeout(a);
            a = setTimeout(function() {
                500 <= $(window).scrollTop() ? $("#scroll-top").fadeIn() : $("#scroll-top").fadeOut()
            }, 200)
        });
        $("#scroll-top").on("click", function() {
            $(window).scrollTop(0)
        })
    }
    )();
})();

// 设置iframe自适应高度
(function() {  
    var cacheHeight = 0;  
    function run() {  
        var mf = $("#mainframe")[0];  
        // when the main frame has already been loaded, the check its height  
        if (mf && mf.contentDocument && mf.contentDocument.body) {  
            var iframeHeight = $("#mainframe")[0].contentDocument.body.clientHeight;  
            if (iframeHeight && iframeHeight != cacheHeight) {  
                // cache the main frame height  
                cacheHeight = iframeHeight;  
                $("#mainframe").height(iframeHeight);  
            }  
        }  
        setTimeout(run, 200);  
    }  
    run();  
})();  



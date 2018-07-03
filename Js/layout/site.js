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


(function () {
  var iframes = $('#mainframe');

  for (var i = 0, j = iframes.length; i < j; ++i) {
    // 放在闭包中，防止iframe触发load事件的时候下标不匹配
    (function (_i) {
      iframes[_i].onload = function () {
        this.contentWindow.onbeforeunload = function () {
          iframes[_i].style.visibility = 'hidden';
          // iframes[_i].style.display = 'none';

          iframes[_i].setAttribute('height', 'auto');
        };

        this.setAttribute('height', this.contentWindow.document.body.scrollHeight);
        console.log(this.contentWindow.document.body.scrollHeight)
        $('#scrollHeight').css('height', this.contentWindow.document.body.scrollHeight + 'px')
        this.style.visibility = 'visible';
        // this.style.display = 'block';
      };
    })(i);
  }
})();

// 轮播切换

// 回到顶部
(function () {
  (function () {
    500 <= $(window).scrollTop() && $("#scroll-top").fadeIn();
    var a;
    $(window).scroll(function () {
      clearTimeout(a);
      a = setTimeout(function () {
        500 <= $(window).scrollTop() ? $("#scroll-top").fadeIn() : $("#scroll-top").fadeOut()
      }, 200)
    });
    $("#scroll-top").on("click", function () {
      $(window).scrollTop(0)
    })
  })();
})();

/** 
* 判断是否null 
* @param data 
*/
function isNull(data) {
  return (data == "" || data == undefined || data == null) ? true : false;
}

// 全屏加载中
loadShade = {
  show: function () {
    $("#FullScreenShade").fadeIn();
  },
  hide: function () {
    $("#FullScreenShade").fadeOut();
  }
};
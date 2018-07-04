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

$(function () {
  /**
   * 模拟select
   **/
  $(".select-header").click(function () {
    $(this).parent().siblings(".select-box").find(".select-content").slideUp("fast");
    if ($(this).siblings(".select-content").is(":hidden")) {
      $(this).addClass("select-arrow");
      $(this).siblings(".select-content").slideDown("fast");
      var evt = new Object;
      if (typeof (window.event) == "undefined") { //如果是火狐浏览器
        evt = arguments.callee.caller.arguments[0];
      } else {
        evt = event || window.event;
      }
      evt.cancelBubble = true;
    } else {
      $(this).removeClass("select-arrow");
      $(this).siblings(".select-content").slideUp("fast");
      //去除事件冒泡
      var evt = new Object;
      if (typeof (window.event) == "undefined") { //如果是火狐浏览器
        evt = arguments.callee.caller.arguments[0];
      } else {
        evt = event || window.event;
      }
      evt.cancelBubble = true;
    }
  });
  $(document).click(function () {
    $(".select-header").removeClass("select-arrow");
    $(".select-content").slideUp("fast");
  });
  $(".select-content li").on("click", function () {
    $(this).parent().siblings(".select-header").removeClass("select-arrow");
    $(this).parent().siblings(".select-header").text($(this).text()).end().slideUp("fast");
  });
  $(".select-content li").hover(function () {
    $(this).css("background-color", "#cfcfcf");
  }, function () {
    $(this).css("background-color", "#fff");
  });
});
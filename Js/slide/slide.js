$(function () {
  //初始化页面
  slide.init();
});

var slide = {
  getData: function () {
    $this = this;
    $.method("GET", "/Category/get", null, null, null, null, function (a) {
      var data = $.buildHierarchy(a.data);
      result = data.children;
      $this.getMenu(data);
    }, function (a) { })
  },
  getMenu: function (a) {
    for (var i = 0; i < a.length; i++) {
      var html = '<li class="layui-nav-item layui-nav-itemed">' +
        '<a class="" href="javascript:;">' + a[i].value.Name + '</a >' +
        '<dl class="layui-nav-child child-slide">'
      if (typeof (a[i].children) != 'undefined') {
        for (var j in a[i].children) {
          var child =
            '<dd>' +
            '<a href="/view/create.html?pid='+a[i].value.ID +'&cid=' + a[i].children[j].value.ID + '" target="mainframe">' + a[i].children[j].value.Name + '</a>' +
            '</dd>';
          html += child
        }
        html = html + '</dl>' + '</li >';
      }
      $('#slide-menu').append(html);
    }
  },
  menuTree: function(){
    $(document).on("click", '#slide-menu li a', function () {
      var dl = $(this).siblings("dl");
      if (dl.find("dd").html() != null) {
        if (dl.css("display") == "none") {
          dl.show(300);
        } else {
          dl.hide(300);
        }
      }
    });
  },
  init: function(){
    this.getData();
    this.menuTree();
  }
};

$(document).on("click", '#slide-menu .buttons .cancelBtn', function () {
  layer.close($index);
});
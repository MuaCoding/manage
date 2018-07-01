(function () {
  var result;
  slide();
})();
https://www.easy-mock.com/mock/5b376013ac15607c8cb841ce/yqcx/Category/get
function slide() {
  $.method("GET", "/mock/5b376013ac15607c8cb841ce/yqcx/Category/get", null, null, null, null, function (a) {
    var data = $.buildHierarchy(a.data);
    // console.log(data)
    result = data.children;
    menu(data);
  }, function (a) {})
};

function menu(a) {
  for (var i = 0; i < a.length; i++) {
    var html = '<li class="layui-nav-item layui-nav-itemed">' +
      '<a class="" href="javascript:;">' + a[i].value.Name + '</a >' +
      '<dl class="layui-nav-child child-slide">'
    if (typeof (a[i].children) != 'undefined') {
      for (var j in a[i].children) {
        var child =
          '<dd>' +
          '<a href="/view/create.html?id=' + a[i].children[j].value.ID + '" target="mainframe">' + a[i].children[j].value.Name + '</a>' +
          '</dd>';
        html += child
      }
      html = html + '</dl>' + '</li >';
    }
    $('#slide-menu').append(html);
  }
}
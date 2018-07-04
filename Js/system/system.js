$(function () {
  //初始化页面
  system.init();
});

var system = {
  getData: function () {
    $.method("GET", "/Category/get", null, null, null, null, function (a) {
      var data = $.buildHierarchy(a.data);
      console.log(data)
      // $this.getMenu(data);
      // $("#tree-list").tmpl(data).appendTo('#div_tree');
      
      for (var i = 0; i < data.length; i++) {
        var parent = '<li class="tree-item clearfix">' +
          '<div><span class="id"> ' + data[i].value.ID + '</span>' +
          '<span class="name" id="parent-box" data-parent-id ="' + data[i].value.ID + '"><i style="margin-right: 10px;" class="icon-right"></i></i>' + data[i].value.Name + '</span>' +
          '<span>' + data[i].value.OrderNum + '</span>' +
          '<span class="opera">' +
          '<a class="btn-action" onclick="system.delete(${ID})">添加子项</a>' +
          '<a class="btn-action" onclick="system.modify(${ID})">修改</a>' +
          '<a class="btn-action" onclick="system.delete(' + data[i].value.PID+')">删除</a>' +
          '</span></div>'+
          '<ul id="child-box">'
        if (typeof (data[i].children) != 'undefined'){
          for (var j = 0; j < data[i].children.length; j++) {
            var child = '<li class="tree-item clearfix"><span class="id">' + data[i].children[j].value.ID + '</span>' +
              '<span class="name" style="padding-left: 85px;" data-child-id ="' + data[i].children[j].value.ID + '">' + data[i].children[j].value.Name + '</span>' +
              '<span>' + data[i].children[j].value.OrderNum + '</span>' +
              '<span class="opera">' +
              '<a class="btn-action" href="/view/increase.html?id=' + data[i].value.ID+'&type=1">添加子项</a>' +
              '<a class="btn-action" href="/view/increase.html?id=' + data[i].value.ID +'&type=2">修改</a>' +
              '<a class="btn-action" onclick="system.delete(' + data[i].children[j].value.PID +')">删除</a>' +
              '</span>'
            '</li >';
            parent += child;
          }
          parent = parent + '</ul></li >';
        }
        
        $('#div_tree').append(parent);
        
      }
    }, function (a) {})
  },
  delete: function(id){
    var delAdrsFunc = function () {
      $.method("GET", "/Category/delete", null, { id: id }, null, null, function (data) {
        if (parseInt(data.Code)) {
          alert("成功删除");
          user.init();
        } else {
          alert("删除失败");
        }
      }, function (request) {
        console.log(request);
      });
    }
    if (!isNull(id)) {
      if (confirm("确认删除？")) {
        delAdrsFunc();
      }
    } else {
      alert("删除失败");
      console.log("缺少收货地址ID");
    }
  },
  init: function () {
    this.getData();
  }
}

$(document).on("click", '#parent-box', function () {
  if ($(this).children("i").hasClass('icon-down')) {
    $(this).find("i").removeClass("icon-down").addClass('icon-right');
    $(this).parent().siblings("#child-box").hide();
  } else {
    $(this).children("i").removeClass("icon-right").addClass('icon-down');
    $(this).parent().siblings("#child-box").show();
  }
});
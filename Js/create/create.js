
(function () {
  create.init();
})();


var imgUrl = null,
	// 获取iframe一级菜单id
	create = {
		getData: function () {
	      var url = window.location.href,
	      	$this = this,
		    id = $this.getParme('id', url);

		  if (id == null) {
		    $('#index').show();
		  } else {
		    $('#list').show();
		    $('#index').hide();
		    $this.getId(id); //获取
		  }
	    },
	    getId: function(id){
	    	var data = [],
	    		$this = this;
			  $.method("GET", "/Category/getbyid", null, {
			    id: id
			  }, null, null, function (a) {
			  	
			    if (a.detail.length == 1) {
			      $('#edit').show();
			      $('#list').hide();

			      $this.render(a);
			    } 
			    else if (a.detail.length > 1) {
			      $('#list').show();
			      for (var i = 0; i < a.detail.length; i++) {
			        if (id == a.detail[i].PID) {
			          data[data.length] = a.detail[i];
			        }
			      }
			      layui.use('table', function () {
			        var table = layui.table;
			        table.render({
			          id: '#main-table',
			          elem: '#main-table',
			          data: data,
			          height: 400,
			          cellMinWidth: 80,
			          page: true,
			          cols: [
			            [{
			              field: 'ID',
			              title: '#',
			              align: 'center'
			            }, {
			              field: 'Img',
			              title: '图片',
			              align: 'center'
			            }, {
			              field: 'PID',
			              title: '所属类别',
			              align: 'center'
			            }, {
			              field: 'OrderNum',
			              title: '排序',
			              align: 'center'
			            }, {
			              field: 'Url',
			              title: '跳转地址',
			              align: 'center'
			            }, {
			              field: 'score',
			              title: '操作',
			              align: 'center',
			              toolbar: '#barDemo'
			            }]
			          ]
			        });
			      });
			    } else {
			      layer.msg("该节点不存在");
			    }

			  }, function (a) {
			    $('#list').hide();
			    $('#edit').hide();
			    layer.msg("该节点不存在");
			  })
	    },
	    getParme: function(name, url){
	    	if (!url) url = window.location.href;
			  name = name.replace(/[\[\]]/g, "\\$&");
			  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			    results = regex.exec(url);
			  if (!results) return null;
			  if (!results[2]) return '';
			  return decodeURIComponent(results[2].replace(/\+/g, " "));
	    },
	    render: function(data){
	    	console.log(data)
		  $('#title').val(data.detail[0].Name);

		  for (var i = 0; i < data.parent.length - 1; i++) {
		    var html = '<li value="' + data.parent[i].ID + '">' + data.parent[i].Name + '</li>';
		    $('.select-box .select-content').append(html);
		  }

		  $(".select-header").text(data.parent[data.parent.length - 2].Name);
		  $(".select-header").attr('value', data.parent[data.parent.length - 1].PID);

		  $('#sort').val(data.detail[0].OrderNum);
		  $('#editor').val(data.detail[0].Name);
	    },
	    init: function(){
	    	this.getData();
	    }
	}

// 点击提交数据
$(document).on("click", "#submin-btn", function () {
  var url = window.location.href,
    res = getUrl('id', url);
  console.log(res)
  var formData = {
    PID: $(".select-header").attr('value'),
    ID: res,
    Name: $('#title').val(),
    sort: $('#sort').val(),
    Img: '',
    Url: '',
    html: $('#editor').text()
  }
  console.log(formData)
  // $.method("POST", "/Category/update", null, JSON.stringify(formData), null, null, function (a) {
  //  console.log(a)
  // }, function (a) {})
});

// 
function onload() {
  var url = window.location.href,
    res = getUrl('id', url);
  if (res == null) {
    $('#index').show();
  } else {
    getId(res);
    $('#list').show();
    $('#index').hide();
  }
}
// 请求参数
function getId(id) {
  var res = [];
  $.method("GET", "/Category/getbyid", null, {
    id: id
  }, null, null, function (a) {

    if (a.detail.length == 1) {
      $('#edit').show();
      $('#list').hide();
      render(a);
    } else if (a.detail.length > 1) {
      $('#list').show();
      for (var i = 0; i < a.detail.length; i++) {
        if (id == a.detail[i].PID) {
          res[res.length] = a.detail[i];
        }
      }
      layui.use('table', function () {
        var table = layui.table;
        table.render({
          id: '#main-table',
          elem: '#main-table',
          data: res,
          height: 400,
          cellMinWidth: 80,
          page: true,
          cols: [
            [{
              field: 'ID',
              title: '#',
              align: 'center'
            }, {
              field: 'Img',
              title: '图片',
              align: 'center'
            }, {
              field: 'PID',
              title: '所属类别',
              align: 'center'
            }, {
              field: 'OrderNum',
              title: '排序',
              align: 'center'
            }, {
              field: 'Url',
              title: '跳转地址',
              align: 'center'
            }, {
              field: 'score',
              title: '操作',
              align: 'center',
              toolbar: '#barDemo'
            }]
          ]
        });
      });
    } else {
      layer.msg("该节点不存在");
    }

  }, function (a) {
    $('#list').hide();
    $('#edit').hide();
    layer.msg("该节点不存在");
  })
}
// 获取菜单id
function getUrl(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
// 渲染编辑
function render(data) {
  console.log(data)
  $('#title').val(data.detail[0].Name);

  for (var i = 0; i < data.parent.length - 1; i++) {
    var html = '<li value="' + data.parent[i].ID + '">' + data.parent[i].Name + '</li>';
    $('.select-box .select-content').append(html);
  }

  $(".select-header").text(data.parent[data.parent.length - 2].Name);
  $(".select-header").attr('value', data.parent[data.parent.length - 1].PID);

  $('#sort').val(data.detail[0].OrderNum);
  $('#editor').val(data.detail[0].Name);

}

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
// 点击下来菜单赋值
$(document).on("click", ".select-box .select-content li", function () {
  $(this).parent().siblings(".select-header").text($(this).text()).end().slideUp("fast");
  $(this).parent().siblings(".select-header").attr('value',$(this).attr('value'))
})

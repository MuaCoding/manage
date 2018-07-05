$(function () {
  //初始化页面
  create.init();
});

var imgUrl = null,
  iframe = document.getElementById("mainframe"),
  // 获取iframe一级菜单id
  ue = UE.getEditor('container'),
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
    getId: function (id) {
      var data = [],
        $this = this;
      $.method("GET", "/Category/getbyid", null, {
        id: id
      }, null, null, function (a) {

        if (a.detail.length == 1) {
          $('#edit').show();
          $('#list').hide();
          $this.render(a);
        } else if (a.detail.length > 1) {
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
              page: false,
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
    getParme: function (name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    },
    render: function (data) {
      // console.log(data)
      $('#title').val(data.detail[0].Name);

      for (var i = 0; i < data.parent.length - 1; i++) {
        var html = '<li value="' + data.parent[i].ID + '">' + data.parent[i].Name + '</li>';
        $('.select-box .select-content').append(html);
      }

      $(".select-header").text(data.parent[data.parent.length - 2].Name);
      $(".select-header").attr('value', data.parent[data.parent.length - 1].ID);

      $('#sort').val(data.detail[0].OrderNum);
      $('#editor').val(data.detail[0].Name);
    },
    iframeHeight:function(){
      var hash = window.location.hash.slice(1), h;
      if (hash && /height=/.test(hash)) {
        h = hash.replace("height=", "");
        iframe.height = h;
      }
      setTimeout(this.iframeHeight(), 200);
    },
    init: function () {
      this.getData();
      // this.iframeHeight();
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



// 点击下来菜单赋值
$(document).on("click", ".select-box .select-content li", function () {
  $(this).parent().siblings(".select-header").text($(this).text()).end().slideUp("fast");
  $(this).parent().siblings(".select-header").attr('value', $(this).attr('value'))
})



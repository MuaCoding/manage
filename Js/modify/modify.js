$(function() {
  //初始化页面
  modify.init();
});

var imgUrl = null,
  iframe = document.getElementById("mainframe"),
  pid = null,
  // 获取iframe一级菜单id
  ue = UE.getEditor('container'),
  modify = {
    getData: function() {
      var url = window.location.href,
        $this = this;
      pid = $this.getParme('pid', url);
      $this.getOption(pid); //获取
    },
    getOption: function(id) {
      var data = [],
        $this = this;
      $.method("GET", "/Category/getbyid", null, {
        id: id
      }, null, null, function(a) {
        if (a.parent) {
          $this.render(a);
        }
      }, function(a) {})
    },
    render: function(data) {
      // console.log(data)
      for (var i = 0; i < data.parent.length - 1; i++) {
        var html = '<li value="' + data.parent[i].ID + '">' + data.parent[i].Name + '</li>';
        $('.select-box .select-content').append(html);
      }
      $(".select-header").text(data.parent[data.parent.length - 2].Name);
      $(".select-header").attr('value', data.parent[data.parent.length - 1].ID);
    },
    getParme: function(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    },
    submit: function() {
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
      $.method("POST", "/Category/update", null, JSON.stringify(formData), null, null, function (a) {
       console.log(a)
      }, function (a) {})
    },
    init: function() {
      this.getData();
    }
  }

// 点击下来菜单赋值
$(document).on("click", ".select-box .select-content li", function() {
  $(this).parent().siblings(".select-header").text($(this).text()).end().slideUp("fast");
  $(this).parent().siblings(".select-header").attr('value', $(this).attr('value'))
})
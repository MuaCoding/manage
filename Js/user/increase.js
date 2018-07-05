$(function () {
  //页面初始化
  increase.init();
});


//头像数据
var imgData = null,
  ue = UE.getEditor('editor'),
  html = null,
  imgUrl = null,
  //禁用头像选择框内滚动事件
  scroll = function (event, scroller) {
    var k = event.wheelDelta ? event.wheelDelta : -event.detail * 10;
    scroller.scrollTop = scroller.scrollTop - k;
    return false;
  },
  //头像操作功能
  increase = {
    //获取用户头像信息
    getData: function () {
      var $this = this,
        avatar = null;
      if (avatar == null) avatar = "";
      $this.crop(avatar);
    },
    getOption: function () {
      var id = $.getUrlParam('id'),
        type = $.getUrlParam('type'),
        flag = false,
        $this = this;
      if (id == null || id == undefined || id == '') {
        window.location.href = '/view/system.html';
      }
      // 判断是新增(1)还是修改(2)
      if (type == 1) {
        flag = true;
      }
      $.method("GET", "/Category/getbyid", null, {
        id: id
      }, null, null, function (a) {
        $this.renderCategory(a, flag);
      }, function (a) {})
    },
    // 显示菜单
    renderCategory: function (data, flag) {
      console.log(data)
      if (data.parent.length > 1) {
        for (var i = 0; i < data.parent.length - 1; i++) {
          var html = '<li value="' + data.parent[i].ID + '">' + data.parent[i].Name + '</li>';
          $('.select-box .select-content').append(html);
        }
      } 
      else if (data.parent == ''){
        $(".select-header").text('站点');
        $(".select-header").attr('value', 0)
      }
      else {
        var html = '<li value="' + data.parent[0].ID + '">' + data.parent[0].Name + '</li>';
        $('.select-box .select-content').append(html);
      }
      // false 时为修改显示数据
      if (!flag) {
        $("#title").val(data.parent[0].Name);
        $("#sort").val(data.parent[0].OrderNum);
        $("#Url").val(data.parent[0].Url);
        // $("#title").val(data.parent[data.parent.length - 1].Name);
      }
      data.parent == '' ? $(".select-header").text('站点') : $(".select-header").text(data.parent[data.parent.length - 1].Name);
      data.parent == '' ? $(".select-header").attr('value', 1) : $(".select-header").attr('value', data.parent[data.parent.length - 1].ID);
      

    },
    //头像裁剪插件
    crop: function (pic) {
      var options = {
        thumbBox: '.thumbBox',
        spinner: '.spinner',
        imgSrc: pic
      };
      var cropper = $('.upload-list').cropbox(options),
        $this = this;
      $('#file').on('change', function () {
        var reader = new FileReader();
        reader.onload = function (e) {
          options.imgSrc = e.target.result;
          cropper = $('.upload-list').cropbox(options);
        }
        reader.readAsDataURL(this.files[0]);
        imgData = this.files[0];
        console.log(this)
        $this.upload(imgData);
        // imgData = cropper.getDataURL();
        this.files = [];
      });
    },
    //上传头像
    upload: function (imgData) {
      var formdata = {
          Img: imgData
        };
      $.method("POST", "/file/upload", null, JSON.stringify(formdata), null, null, function (data) {
        console.log(data)
        imgUrl = data.msg;
        // if (data.Code) {
        //   // $this.finishUpload(data.res_msg);
        //   imgUrl = data.msg;
        // }
      }, function (request) {
        
      });
    },
    //完成数据上传
    finishUpload: function () {
      ue.ready(function () {
        html = ue.getContent();
      });
      $this = this;
      console.log(imgUrl)
      var formdata = {
        PID: $(".select-header").attr('value') || 0,
        Name: $('#title').val(),
        OrderNum: $('#sort').val(),
        Img: imgData,
        Url: $('#Url').val(),
        html: html
      };
      if ($this.validForm(formdata)) {
        $.method("POST", "/Category/add", null, JSON.stringify(formdata), null, null, function (data) {
          if (data.Code == 1) {
            layer.msg('创建成功');
            setTimeout(function () { //两秒后跳转
              window.location.href = "/view/system.html";
            }, 2000);
          } else {
            layer.msg('创健失败');
            window.location.href = window.location.href;
          }
        }, function (request) {});
      }


    },
    validForm: function (data) {
      var invalid = false;
      if (data.Name == "") {
        layer.msg('类别名称不能为空');
        invalid = true;
        return;
      }
      if (data.OrderNum == "") {
        layer.msg('排序不能为空');
        invalid = true;
        return;
      }
      if (invalid) {
        return false;
      }
      return true;
    },
    //初始化
    init: function () {
      this.getData();
      this.getOption();
    }
  };
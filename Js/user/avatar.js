$(function () {
  //设置页面标题
  // setPageTitle("头像设置");
  //头像页面初始化
  avatar.init();
});


//头像数据
var imgData = null,
  imgUrl = null,
  //禁用头像选择框内滚动事件
  scroll = function (event, scroller) {
    var k = event.wheelDelta ? event.wheelDelta : -event.detail * 10;
    scroller.scrollTop = scroller.scrollTop - k;
    return false;
  },
  //头像操作功能
  avatar = {
    //获取用户头像信息
    getData: function () {
      var $this = this,
        avatar = null;
      if (avatar == null) avatar = "/Images/upload.png";
      $this.crop(avatar);
      // $.method("GET", "User/getUserInfo", null, null, { "User-Token": user_token }, null, function (data) {
      //     var avatar = data[0].pic;
      //     if (avatar == null) avatar = "/images/icons/user-male-default.png";
      //     $this.crop(avatar);
      //     loadShade.hide();
      // }, function (request) {
      //     alert(request);
      //     loadShade.hide();
      // });
    },
    //头像裁剪插件
    crop: function (pic) {
      var options = {
        thumbBox: '.thumbBox',
        spinner: '.spinner',
        imgSrc: pic
      };
      var cropper = $('.upload-list').cropbox(options);
      $('#file').on('change', function () {
        var reader = new FileReader();
        reader.onload = function (e) {
          options.imgSrc = e.target.result;
          cropper = $('.upload-list').cropbox(options);
        }
        reader.readAsDataURL(this.files[0]);
        imgData = cropper.getDataURL();
        this.files = [];
      });
      // $('#btnCrop').on('click', function () {
      //   imgData = cropper.getDataURL();
      //   $('.Cropped > .BigSize,.Cropped > .SmallSize').html('<img src="' + imgData + '">');
      // });
      // $('#btnZoomIn').on('click', function () {
      //   cropper.zoomIn();
      // });
      // $('#btnZoomOut').on('click', function () {
      //   cropper.zoomOut();
      // });
    },
    //上传头像
    upload: function () {
      // if (imgData == null) {
      //   alert("请先选择头像裁剪");
      //   return false;
      // }
      var formdata = {
          pic: imgData
        },
        $this = this;
      $.method("POST", "/mock/5b376013ac15607c8cb841ce/yqcx/file/upload", null, JSON.stringify(formdata), null, null, function (data) {
        if (data.res_code) {
          // $this.finishUpload(data.res_msg);
          imgUrl = data.msg;
        }
      }, function (request) {
        var errCode = JSON.parse(request.responseText).err_code;
        switch (errCode) {
          default: jwtError(request);
        }
      });
    },
    //完成上传头像
    finishUpload: function () {
      var formdata = {
        PID: $(".select-header").attr('value'),
        ID: res,
        Name: $('#title').val(),
        sort: $('#sort').val(),
        Img: imgUrl,
        Url: '',
        html: $('#editor').text()
      };
      $.method("POST", "User/updateUser_Pic", null, JSON.stringify(formdata), {
        "User-Token": user_token
      }, null, function (data) {
        
      }, function (request) {
      });
    },
    //初始化
    init: function () {
      loadShade.show();
      this.getData();
    }
  };
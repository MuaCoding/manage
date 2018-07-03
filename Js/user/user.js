// 表格

$(function() {
  user.init();
});

// 获取用户列表
var data = null,
  user = {
    getData: function() {
      $.method("GET", "/Users/getusers", null, {
        page: 1
      }, null, null, function(a) {
        console.log(a);　　
        $("#user-list").tmpl(a.data).appendTo('#div_list');
      }, function(a) {

      })
    },
    modify: function(id) {
      // alert(id)
      var addr = { username: "", password: "" };

      //判断是否带有id，有则查询数据并显示
      aId = arguments[0] ? parseInt(arguments[0]) : null;
      if (!isNull(aId)) {
        $("#userDiv > .div-title > .title").html("修改");
        $("#userDiv .buttons > a.newBtn").addClass("none");
        $("#userDiv .buttons > a.editBtn").removeClass("none");
        var currentAdrs;
        for (var i in adrs) {
          if (adrs[i].id == aId) {
            currentAdrs = adrs[i];
            break;
          }
        }
        if (!isNull(currentAdrs)) {
          addr.id = currentAdrs.id;
          addr.username = currentAdrs.username;
          addr.password = currentAdrs.password;
        }
      } else {
        $("#userDiv > .div-title > .title").html("新增");
        $("#userDiv .buttons > a.newBtn").removeClass("none");
        $("#userDiv .buttons > a.editBtn").addClass("none");
      }

      //显示数据到弹窗
      var userDiv = $("#userDiv");
      userDiv.find(".username input[type='text']").val(addr.username);
      userDiv.find(".password input[type='password']").val(addr.password);

      //捕获地址填写表单 
      var $index = layer.open({
        type: 1,
        shade: [0],
        title: false,
        closeBtn: false,
        scrollbar: false,
        shift: 5,
        area: ['300px'],
        content: $('#userDiv')
      });

      //关闭用户表单按钮事件
      $(document).on("click", '#userDiv .buttons .cancelBtn', function() {
        layer.close($index);
      });
    },
    upload: function(method) {
      var formDiv = $(".input-list > ul");
      //用户数据
      var addrData = {
        'id': null,
        'username': formDiv.find(".a-name input[type='text']").val(),
        'password': formDiv.find(".a-phone input[type='password']").val(),
      };

      //判断当前是添加还是修改 选择API
      var apiUrl = method ? "User/addressAdd" : "User/addressEdit";

      if (validForm(addrData)) {
        $.method("POST", apiUrl, null, JSON.stringify(addrData), { "User-Token": user_token }, null, function(data) {
          if (parseInt(data.res_code)) {
            alert(method ? "添加成功！" : "修改成功！");
            layer.closeAll();
            window.location.href = location.href;
          } else {
            alert(method ? "添加失败！" : "修改失败！");
          }
        }, function(request) {
          console.log(request);
        });
      }
    },
    delete: function(id) {
      var delAdrsFunc = function() {
        var formdata = { 'id': id };
        $.method("GET", "/User/addressDelete", null, formdata, null, null, function(data) {
          if (parseInt(data.res_code)) {
            alert("成功删除");
            user.init();
          } else {
            alert("删除失败");
          }
        }, function(request) {
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
    search: function(keyword) {
      var formdata = { 'id': keyword };
      $.method("GET", "/User/searchusers", null, formdata, null, null, function(data) {
        $("#user-list").tmpl(a.data).appendTo('#div_list');
      }, function(request) {
        console.log(request);
      });
    },
    validForm: function(data) {
      var invalid = false;

      var formDiv = $(".DivContent > ul");
    },
    init: function() {
      this.getData();
    }

  }
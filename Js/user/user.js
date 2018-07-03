// 表格

$(function() {
  user.init();
});

// 获取用户列表
var data = null,
  adrs = null,
  user = {
    getData: function() {
      $.method("GET", "/users/getallusers", null, null, null, null, function(a) {
        console.log(a);　
        adrs = a.data;　
        $("#user-list").tmpl(a.data).appendTo('#div_list');
      }, function(a) {

      })
    },
    modify: function(id) {
      // alert(id)
      var addr = { username: "", password: "" };

      //判断是否带有id，有则查询数据并显示
      aId = arguments[0] ? parseInt(arguments[0]) : null;
      if (aId) {
        $("#userDiv > .div-title > .title").html("修改");
        $("#userDiv .buttons > a.newBtn").addClass("none");
        $("#userDiv .buttons > a.editBtn").removeClass("none");
        var currentAdrs;
        for (var i in adrs) {
          if (adrs[i].ID == aId) {
            currentAdrs = adrs[i];
            break;
          }
        }
        if (!isNull(currentAdrs)) {
          addr.id = currentAdrs.ID;
          addr.username = currentAdrs.UserName;
          addr.password = currentAdrs.Password;
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
      userDiv.attr("data-attr-id", addr.id);
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
        id: null,
        UserName: formDiv.find(".username input[type='text']").val(),
        Password: formDiv.find(".password input[type='password']").val(),
      };
      //如果为修改 获取地址ID
      addrData.id = method ? null : $("#userDiv").attr("data-attr-id");
      //判断当前是添加还是修改 选择API
      var apiUrl = method ? "/Users/add" : "/Users/update";
      var $this = this;
      if ($this.validForm(addrData)) {
        $.method("POST", apiUrl, null, JSON.stringify(addrData), null, null, function(data) {
          if (parseInt(data.Code)) {
            alert(method ? "添加成功！" : "修改成功！");
            layer.closeAll();
            window.location.href = window.location.href;
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
        var formdata = { id: id };
        $.method("GET", "/users/ddeleteById", null, { id: id }, null, null, function(data) {
          if (parseInt(data.Code)) {
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
    search: function() {
      var keyword = $('#search').val();
      if (!keyword) {
        layer.msg('请输入用户名')
        return;
      }
      var formdata = { name: keyword };
      $.method("GET", "/users/getuserbyname", null, formdata, null, null, function(data) {
        if (data.data != ''){
          $("#div_list").empty();
          $("#user-list").tmpl(data.data).appendTo('#div_list');
        }else{
          layer.msg('该用户名不存在')
        }
      }, function(request) {
        console.log(request);
      });
    },
    validForm: function(data) {
      var invalid = false;
      console.log(data)
      var formDiv = $(".input-list > ul");
      if (data.UserName == null || data.UserName == "" || typeof (data.UserName) == "undefined") {
        layer.msg("用户名必填");
        invalid = true;
        return;
      }
      if (data.Password == null || data.Password == "" || typeof (data.Password) == "undefined") {
        layer.msg("密码必填");
        invalid = true;
        return;
      }
      if (invalid) { return false; }
      return true;
    },
    init: function() {
      this.getData();
    }

  }
$(function () {
  // 登陆
  function login() {
    var username = $('.input-username').val(),
      password = $('.input-password').val();
    formData = {
      UserName: username,
      Password: password
    }
    if (username == ''){
      layer.msg("请输入用户名");
      return;
    }
    if (password == '') {
      layer.msg("请输入密码");
      return;
    }
    $.method("POST", "/Users/login", null, JSON.stringify(formData), null, null, function (a) {
      switch (a.Code) {
        case 1:
          layer.msg("登录成功");
          setCookie("USER_TOKEN", username, 10);
          window.location.replace("/");
          break;
        default:
          layer.msg("登录失败，用户名或密码错误");
      }
    }, function (a) {})
  };
  $('.layui-btn').click(function () {
    login();
  })
});
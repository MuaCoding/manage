// 表格
(function () {
  layui.use('table', function () {
    var table = layui.table;
    table.render({
      id: '#main-table',
      elem: '#main-table',
      height: 315,
      cellMinWidth: 80,
      url: 'https://www.easy-mock.com/mock/5b345279f512b5707142c022/table/table' //数据接口
        ,
      page: false //开启分页
        ,
      cols: [
        [ //表头
          {
            field: 'id',
            title: '#',
            align: 'center'
          }, {
            field: 'username',
            title: '图片',
            align: 'center'
          }, {
            field: 'sex',
            title: '所属类别',
            align: 'center'
          }, {
            field: 'city',
            title: '发布时间',
            align: 'center'
          }, {
            field: 'sign',
            title: '排序',
            align: 'center'
          }, {
            field: 'experience',
            title: '显示状态',
            align: 'center'
          }, {
            field: 'score',
            title: '操作',
            align: 'center',
            toolbar: '#barDemo'
          }
        ]
      ]
    });

    //监听工具条
    table.on('tool(demo)', function (obj) {
      var data = obj.data;
      if (obj.event === 'detail') {
        layer.msg('ID：' + data.id + ' 的查看操作');
      } else if (obj.event === 'del') {
        layer.confirm('真的删除行么', function (index) {
          obj.del();
          layer.close(index);
        });
      } else if (obj.event === 'edit') {
        layer.alert('编辑行：<br>' + JSON.stringify(data))
      }
    });
  });
})();

$(function () {
  user.init();
});

// 获取用户列表
var data = null,
  user = {
    getData: function () {
      $.method("GET", "/Users/getusers", null, {
        page: 1
      }, null, null, function (a) {
        console.log(a);　　 $("#user-list").tmpl(a.data).appendTo('#div_list');
      }, function (a) {

      })
    },
    modify: function (id) {

      alert(id)
    },
    delete: function (id) {

    },
    init: function () {
      this.getData();
    }

  }
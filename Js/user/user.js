// 表格
(function(){
    layui.use('table', function(){
      var table = layui.table;
      table.render({
        id: '#main-table',
        elem: '#main-table'
        ,height: 315
        ,cellMinWidth: 80
        ,url: 'https://www.easy-mock.com/mock/5b345279f512b5707142c022/table/table' //数据接口
        ,page: true //开启分页
        ,cols: [[ //表头
          {field: 'id', title: '#', align: 'center'}
          ,{field: 'username', title: '图片', align: 'center'}
          ,{field: 'sex', title: '所属类别', align: 'center'}
          ,{field: 'city', title: '发布时间', align: 'center'} 
          ,{field: 'sign', title: '排序', align: 'center'}
          ,{field: 'experience', title: '显示状态', align: 'center'}
          ,{field: 'score', title: '操作', align: 'center', toolbar: '#barDemo'}
        ]]
      });
    });
})()
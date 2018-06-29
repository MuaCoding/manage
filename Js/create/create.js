layui.use(['form', 'laydate'], function(){
  var form = layui.form,
  	  laydate = layui.laydate;
  //监听提交
  form.on('submit(formDemo)', function(data){
    layer.msg(JSON.stringify(data.field));
    return false;
  });

  laydate.render({
    elem: '#test1',
    type: 'date',
    value: new Date()
  });
});

layui.use('upload', function(){
  var $ = layui.jquery,
  upload = layui.upload;
  
  upload.render({
    elem: '#layuiadmin-upload-useradmin'
    ,url: '/upload/'
    ,accept: 'images'
    ,method: 'get'
    ,acceptMime: 'image/*'
    ,before: function(obj){
    	console.log(obj)
      //预读本地文件示例，不支持ie8
      obj.preview(function(index, file, result){

        $('#img').attr('value', file); //图片链接（base64）
      });
    }
    ,done: function(res){
    	console.log(res)
      $(this.item).prev("div").children("input").val(res.data.src)
    }
    ,error: function(){
     	
    }
  });
});
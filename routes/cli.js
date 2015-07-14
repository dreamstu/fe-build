var express = require('express');
var settings = require('../tools/settings');
var build = require('quick-build-core')(settings);
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.post('/list', function(req, res, next) {
  var inf = req.body.inf;
  var outf = req.body.outf;
  build.getQueue(inf,function(err,queue){
    if(err){
      res.render('error', { message: '抱歉，不能正确获取待构建组件列表信息',error:{status:'500',stack:err}});
    }else{
      res.render('list', { 
        title: '构建-前端自动化',
        queue:queue,
        inf:inf,
        outf:outf
      });
    }
  });
});

module.exports = router;

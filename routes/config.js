var express = require('express');
var router = express.Router();
var fs = require('fs');
var appcfg = require('../configs/app-cfg');
/* GET home page. */
router.get('/', function(req, res, next) {
  var exists = fs.existsSync(appcfg.cfgfile.build.out);
  var cfgpath = appcfg.cfgfile.build.src;
  if(exists){
    cfgpath = appcfg.cfgfile.build.out;
  }
  fs.readFile(cfgpath,function(err,data) {
    var code = 0;
    if (err){
      code = 1;
    }
    res.render('config', { title: '配置-前端自动化',config:data,code:code,msg:err });
  });
});

router.post('/update', function(req, res, next) {
  var data = req.param('config');
  if(String(data).length>0){
    fs.writeFile(appcfg.cfgfile.build.out,data,function(err) {
      var code = 0;
      if (err){
        code = 1;
      }
      res.render('config', { title: '配置-前端自动化',config:data,code:code,msg:err || '配置已更新'});
    });
  }else{
    res.render('config', { title: '配置-前端自动化',config:data,code:1,msg:'配置不能为空' });
  }
});

module.exports = router;

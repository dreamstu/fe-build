var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var appcfg = require('../configs/app-cfg');

router.param(function(name, fn) {
  if (fn instanceof RegExp) {
    return function(req, res, next, val) {
      var captures;
      if (captures = fn.exec(String(val))) {
        req.params[name] = captures;
        next();
      } else {
        res.send({"code":1,"msg":"无法获取配置文件，项目名非法（只能包含数字字母和-）"});
      }
    }
  }
});

/* GET queries listing. */
router.param('project', /^[0-9A-Za-z-]+$/);

router.get('/cfg/:project', function(req, res, next) {
  fs.readFile(path.join(__dirname,'..',appcfg.configs,req.params.project+'.js'), 'utf-8', function(err, data) {
    if(err) {
        console.error(err);
    } else {
        res.send(data);
    }
  });

});


module.exports = router;

var express = require('express');
var build = require('../tools/lib/build')();
var router = express.Router();
var fs = require('fs');
var path = require('path');
var appcfg = require('../configs/app-cfg');

/* GET users listing. */
router.post('/begin', function(req, res, next) {
  var project = req.body.project;
  var config = req.body.config;
  var current = String(new Date().getTime());
  project = project+'_'+current;
  var _path = path.join(__dirname,'..',appcfg.temp,project)+'.js';
  fs.writeFile(_path,config,function(err) {
    if (err) console.log(err);
    console.log('>> current config file path:',project);
    res.send({"project":project});
  });
});

function getRealPath(project){
  return path.join(__dirname,'..',appcfg.temp,project)+'.js';
}

router.get('/list/:configpath', function(req, res, next) {
  var configpath = getRealPath(req.params.configpath);
  build.setConfig(configpath);
  var list = build.start();
  res.render('list', { title: '构建-前端自动化',list:list,path:req.params.configpath });
});

module.exports = router;

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
  var _path = path.join(__dirname,'..',appcfg.procfg,appcfg.procfgs[project],project)+'.js';
  var _dirname = path.dirname(_path);
  if(!fs.existsSync(_dirname)){
    fs.mkdirSync(_dirname);
  }
  fs.writeFile(_path,config,function(err) {
    if (err) console.log(err);
    console.log('>> current config file path:',project);
    res.send({"config":project});
  });
});

function getRealPath(config){
  return path.join(__dirname,'..',appcfg.procfg,appcfg.procfgs[config],config)+'.js';
}

router.get('/list/:config', function(req, res, next) {
  var configpath = getRealPath(req.params.config);
  build.setConfig(configpath);
  var list = build.start();
  res.render('list', { title: '构建-前端自动化',list:list,path:req.params.config });
});

module.exports = router;

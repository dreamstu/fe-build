var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页-前端自动化' });
});

router.get('/tool', function(req, res, next) {
  res.render('tool', { title: '选择构建项目' });
});

router.get('/about', function(req, res, next) {
    res.render('about', { title: 'about-前端自动化'});
});

router.get('/preview/:md', function(req, res, next) {
	var mdPath = req.params.md;
	var md = fs.readFileSync(path.join(__dirname, '..', '/md/', mdPath)+'.md');
    res.render('module', { title: '模块编写－前端自动化',content:md});
});

module.exports = router;

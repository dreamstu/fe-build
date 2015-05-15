var express = require('express');
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

module.exports = router;

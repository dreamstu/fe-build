/***
 * 此文件为quick配置文件
 */
module.exports = function(quick) {
  //var basePath = '/home/johnkim/Desktop';
  var basePath = '/home/johnkim/Documents/svn/working/static/debug/marketing-static/crm/pc/js'
  quick.initConfig({
    //日志目录
    logFileFolder: "_logs",
    //构建配置
    build: {
      path: basePath + "/static/page",
      filter: /^(node_modules|jquery|seajs|logs)$/i
    }
  });
};

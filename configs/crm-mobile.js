/***
 * 此文件为quick配置文件
 * @param debug 是否为debug模式
 */

var debug = true;

if(debug){
    module.exports = function(quick){
        var basePath = '/home/johnkim/Documents/tmp';
        quick.initConfig({
            //日志目录
            logFileFolder:"_logs",
            //构建配置
            build:{
                path:basePath+"/pre-build",
                filter:/^(node_modules|jquery|seajs|logs)$/i
            },
            //静态资源配置
            serve:{
                port:2500,
                mine : {//mine类型
                    "html": "text/html",
                    "tpl": "text/plain"
                },
                expires : {//过期时间
                    fileMatch: /^(gif|png|jpg|js|css)$/ig,
                    maxAge: 0
                }
            }
        });
    };
}else{
    module.exports = function(quick){
        quick.initConfig({
            //静态资源配置
            serve:{
                port:5000,
                mine : {//mine类型
                    "html": "text/html",
                    "tpl": "text/plain"
                }
            }
        });
    };
}

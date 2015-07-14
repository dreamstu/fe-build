var path = require('path');
var settings = require('./settings');

var getColor=function(){
  var colors = ['aliceblue','antiquewhite','aqua','aquamarine','pink','red','green',
                'orange','blue','blueviolet','brown','burlywood','cadetblue'];
  return colors[Math.round(Math.random() * 10000 % colors.length)];
};
var getTime=function(){
  var date = new Date();
  return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
};

module.exports = {
  start: function(io) {
    //设置日志级别
    io.set('log level', 1);
    io.on('connection', function(socket) {
      socket.emit('open'); //通知客户端已连接
      socket.emit('init','> 初始化完成,待就绪\r\n');
      socket.on('start', function(obj) {
        //重写打印日志
        settings.printLog = function(){
          socket.emit('message',Array.prototype.join.call(arguments,''));
        }
        //通知客户端剩余数量
        settings.process = function(name){
          socket.emit('build-number',name);
        }
        //构建完毕触发
        settings.done = function(){
          socket.emit('done','已经全部构建完成！');
        }

        var build = require('quick-build-core')(settings);
        //构造可选参数
        var params = {
          inf:obj.inf,
          outf:obj.outf,
          queue:obj.dirs,
          moreLog:obj.moreLog,
          mislead:obj.mislead,
          uglify:obj.uglify,
          id:obj.ideading
        };
        build.start(params);
      });

      // 构造客户端对象
      var client = {
        socket: socket,
        name: false,
        color: getColor()
      }

      //监听出退事件
      socket.on('disconnect', function() {
        var obj = {
          time: getTime(),
          color: client.color,
          author: 'System',
          text: client.name,
          type: 'disconnect'
        };
        console.log('>>> 用户已退出');
        // 广播用户已退出
        socket.broadcast.emit('system', obj);
      });

    });
  }
}

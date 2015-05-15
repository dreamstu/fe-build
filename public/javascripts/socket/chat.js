$(function() {
  //建立websocket连接
  socket = io.connect('http://localhost:3000');
  //收到server的连接确认
  socket.on('open', function() {
    console.log('begin...');
  });

  window.socket = socket;
});

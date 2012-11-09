var net = require('net');
var server = net.createServer(function (socket) {
  socket.on("connect", function(){
    socket.write("conectado al chat");
  });
  socket.on("data",function(data){
    socket.write("ud envio: "+data);
    if(data.toString().trim()=="salir"){
        socket.end("chaolin");
    }
  });
  socket.on("end",function(){
  });
  socket.on("close",function(){
  });
  socket.on("timeout",function(){
  });
})
server.listen(5555);

console.log('Server running at telnet localhost 5555');

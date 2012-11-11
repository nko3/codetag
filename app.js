
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var parser = require('url').parse;

var app = express();

var httpServer = http.createServer(app);

var io = require('socket.io').listen(httpServer);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

io.sockets.on('connection', function(socket){
  socket.nickname=socket.id;
  socket.on('newUrl', function(data){
    var urlObj = parser(data.url);
    var channel = urlObj.host+urlObj.pathname;

    socket.get('channel', function(err, oldChannel){
      if(oldChannel){
        socket.leave(oldChannel);
      }
      socket.set('channel', channel, function(){
        socket.join(channel);
        socket.emit('message', { sender:"server", message: 'welcome to the '+channel+' channel'});
      });

    });

  });
  socket.on('message', function(msg){
    var command = msg.message.trim().match('^>([a-zA-Z]+):([a-zA-Z0-9-_]+)$');
    if(command){
      if(command[1]=="nick"){
        socket.nickname = command[2];
        socket.emit('message', { sender:"server", message: 'you have changed your nickname to '+socket.nickname});
        return;
      }
    }
    socket.get('channel', function(err, channel){
      console.log(channel);
      socket.broadcast.to(channel).emit('message', {sender:socket.nickname, message: msg.message});
    });
  });

  socket.on('get channels', function(){
    var channels = io.sockets.manager.rooms;
    socket.emit('update channels', channels);
  });

  socket.on('get tab users', function(info){
    console.log(info);
    if(info.status === 'loading'){
      var urlObj = parser(info.url);
      var channelUsers = io.sockets.manager.rooms[urlObj.host+urlObj.pathname];
      channelUsers.tabId = info.tabId;
      socket.emit('tab users', channelUsers);
      console.log(channelUsers);
    }
  });

});

httpServer.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

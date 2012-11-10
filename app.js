
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

var httpServer = http.createServer(app);

var io = require('socket.io').listen(httpServer);
var server = require('./server');

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
  socket.on('newUrl', function(data){
    console.log(data);
    io.sockets.emit('message', { sender:"server", info: 'welcome to the #'+data.url+' channel'});
  });
  socket.on('message', function(msg){
    console.log(msg.message);
    io.sockets.emit('message', {sender:socket.id, info: msg.message});
  });

});

httpServer.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

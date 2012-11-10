var socket = io.connect('http://localhost:3000');

socket.emit('newUrl', {
  url: document.URL,
  host: window.location.host,
  path: window.location.pathname
});

socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});
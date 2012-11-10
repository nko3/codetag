var socket = io.connect('http://localhost:3000');

document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.getSelected(undefined, function(tab){
    console.log(tab.url);
    socket.emit('newUrl', {
      url: tab.url
    });
  });
});

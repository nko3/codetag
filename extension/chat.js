var socket = io.connect('http://localhost:3000');

chrome.tabs.onActivated(function(activeInfo) {
  console.log(activeInfo);
  chrome.tabs.getSelected(undefined, function(tab){
    socket.emit('newUrl', {
      tab: tab
    });
  });
});

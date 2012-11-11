var socket = io.connect('http://codechat.jit.su');

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.getSelected(undefined, function(tab){
    chrome.tabs.executeScript(null,{file:"socket.io.js"}); //cargo los js en el ambito de la pagina
    chrome.tabs.executeScript(null,{file:"chatroom.js"});
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  var x = parseInt(Math.random(100)*100);
  x = ""+x;
  chrome.browserAction.setBadgeText({text:x,tabId:tabId});
  socket.emit("test service", changeInfo);
});

var port = chrome.extension.connect();

console.log("this is running in background");
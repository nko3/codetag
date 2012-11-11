var socket = io.connect('http://codechat.jit.su');

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.getSelected(undefined, function(tab){
    chrome.tabs.executeScript(null,{file:'socket.io.js'}); //cargo los js en el ambito de la pagina
    chrome.tabs.executeScript(null,{file:'chatroom.js'});
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  changeInfo.tabId = tabId;
  socket.emit('get tab users', changeInfo);
});

socket.on('tab users', function(tabUsers){
  console.log(tabUsers);
  chrome.browserAction.setBadgeText({text:tabUsers.length,tabId:tabUsers.tabId});
});

var port = chrome.extension.connect();
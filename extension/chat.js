document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.getSelected(undefined, function(tab){
  	chrome.tabs.executeScript(null,{file:"socket.io.js"}); //cargo los js en el ambito de la pagina
    chrome.tabs.executeScript(null,{file:"chatroom.js"});
  });
});

var port = chrome.extension.connect();


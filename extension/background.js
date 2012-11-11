chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.getSelected(undefined, function(tab){
    chrome.tabs.executeScript(null,{file:"socket.io.js"}); //cargo los js en el ambito de la pagina
    chrome.tabs.executeScript(null,{file:"chatroom.js"});
  });
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
	var x = parseInt(Math.random(100)*100);
	x = ""+x;
	chrome.browserAction.setBadgeText({text:x,tabId:activeInfo.tabId});
});

var port = chrome.extension.connect();

console.log("this is running in background");
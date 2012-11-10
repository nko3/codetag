var parser = require('url').parse;

exports.getRoom = function(data, socket){
  var urlObj = parser(data.tab.url);
  var room = urlObj.host+url.pathname; //ex www.google.com + /search
  console.log(room);
};
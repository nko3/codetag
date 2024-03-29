//inyecta js en la pagina del cliente
var injectJS = function(script, callback){
    var oScript = document.createElement("script");
    oScript.src = script;
    document.body.appendChild(oScript);
    oScript.onload = callback;
};
var injectCSS = function(css){
  var fileref=document.createElement("link");
  fileref.setAttribute("rel", "stylesheet");
  fileref.setAttribute("type", "text/css");
  fileref.setAttribute("href", css);
  document.head.appendChild(fileref);
};

//carga el div con el chat
var loadFrame = function(){

    var newdiv = document.createElement('div');
    newdiv.id = "chatSite-box";
    document.body.appendChild(newdiv);
    
    newdiv.innerHTML="<div id='chatHeader'><div id='chat-title'><b>CodeChat - chat for all</b></div>\
    <div id='chat-options'><a id='minimize' href='#' title='minimize'>_</a> <a id='close' href='#' title='close this chat'>X</a></div></div>\
    <form action='#' id='chat'>\
        <textarea id='log' disabled></textarea>\
        <textarea id ='chatBox' disabled></textarea>\
    </form>";
};
(function(){
	if(typeof(jQuery)=="undefined"){
		var jquery = injectJS("http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js");
	}

	var socketiojs = injectJS("http://codechat.jit.su/js/socket.io.js",function(){
	        injectJS("http://codechat.jit.su/js/client.js");
	        //injectJS("http://localhost:3000/js/client.js");
	    });
	    
	injectCSS("http://codechat.jit.su/stylesheets/client.css");
	//injectCSS("http://localhost:3000/stylesheets/client.css");
	loadFrame();
})();
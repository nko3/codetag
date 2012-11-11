//inyecta socketio en la pagina del cliente
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
var injectClient = function(){
    setTimeout(function(){
        if (typeof(io)=="undefined"){
            injectClient();
        }else{
            injectJS("http://codechat.jit.su/js/client.js");
        }
    }, 1000);
};
var loadJS = function(){
    injectJS("http://codechat.jit.su/js/socket.io.js");
    injectJS("http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js");
    injectClient();
};

//carga el div con el chat
var loadFrame = function(){

    var newdiv = document.createElement('div');
    newdiv.id = "chatSite-box";
    document.body.appendChild(newdiv);
    
    newdiv.innerHTML="<a id='close' href='#'>X</a>\
    <form action='#' id='chat'>\
        <textarea id='log' disabled></textarea>\
        <input id ='chatBox' type='text' disabled>\
    </form>";
};

(function(){
    var socketiojs = injectJS("http://codechat.jit.su/js/socket.io.js",function(){
        injectJS("http://localhost:3000/js/client.js");
    });
    var jquery = injectJS("http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js",undefined);
    injectCSS("http://localhost:3000/stylesheets/client.css");
    loadFrame();
})();

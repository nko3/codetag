//inyecta socketio en la pagina del cliente
function injectJS(script) {
    var oScript = document.createElement("script");
    oScript.src = script;
    document.body.appendChild(oScript);
}
var injectClient = function(){
    setTimeout(function(){
        if (typeof(io)=="undefined"){
            injectClient();
        }else{
            injectJS("http://localhost:3000/js/client.js");
        }
    }, 1000);
}
var loadJS = function(){
    injectJS("http://codechat.jit.su/js/socket.io.js");
    injectJS("http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js");
    injectClient();
}

//carga el div con el chat
var loadFrame = function(){

	var newdiv = document.createElement('div');
    newdiv.id = "chatSite-box";
	newdiv.style.width = '300px';
	newdiv.style.height = '300px';
	newdiv.style.background = '#00C';
	newdiv.style.right='30px';
	newdiv.style.bottom='0px';
	newdiv.style.position='fixed';
	document.body.appendChild(newdiv);

	newdiv.innerHTML="<a id='close' href='#'>X</a>\
    <form action='#' id='chat'>\
		<input id ='chatBox' type='text' disabled>\
		<textarea id='log' disabled style=\"margin: 0px 0px 9px; height: 244px; width: 279px;\"></textarea>\
		</form>";
};

loadJS();
loadFrame();


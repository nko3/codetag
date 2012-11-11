//inyecta socketio en la pagina del cliente
function injectSocketIO() {
    var oScript = document.createElement("script");
    oScript.language = "javascript";
    oScript.type = "text/javascript";
    oScript.src = "http://codechat.jit.su/js/socket.io.js";
    document.getElementsByTagName('BODY').item(0).appendChild(oScript);
}

function injectJquery() {
    var oScript = document.createElement("script");
    oScript.language = "javascript";
    oScript.type = "text/javascript";
    oScript.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js";
    document.getElementsByTagName('BODY').item(0).appendChild(oScript);
}

//inyecta el codigo javascript para poder enviar mensajes
function merge() {
    var oScript = document.createElement("script");
    oScript.language = "javascript";
    oScript.type = "text/javascript";
    var newScript = "var socket = io.connect('http://codechat.jit.su');\
    socket.emit('newUrl', {url: document.location.href});\
    socket.on('message',function(data){\
    	$('#log').val($('#log').val() +data.sender+\": \"+data.message+\"\\n\");\
    	var psconsole = $('#log');\
      psconsole.scrollTop(psconsole[0].scrollHeight - psconsole.height());\
    });\
	$('#chat').submit(function(){\
		var inputText = $('#chatBox').val();\
    $('#log').val($('#log').val() +\"You: \"+inputText+\"\\n\");\
    var psconsole = $('#log');\
    psconsole.scrollTop(psconsole[0].scrollHeight - psconsole.height());\
		$('#chatBox').val('');\
		socket.emit('message', {message: inputText});\
		return false;\
	});";
    oScript.text = newScript;
    document.getElementsByTagName('BODY').item(0).appendChild(oScript);
}

//carga el div con el chat
var loadFrame = function(){

	var newdiv = document.createElement('div');
	newdiv.style.width = '300px';
	newdiv.style.height = '300px';
	newdiv.style.background = '#00C';
	newdiv.style.right='30px';
	newdiv.style.bottom='0px';
	newdiv.style.position='fixed';
	document.body.appendChild(newdiv);

	newdiv.innerHTML="<form action='#' id='chat'>\
		<input id ='chatBox' type='text'>\
		<textarea id='log' disabled style=\"margin: 0px 0px 9px; height: 244px; width: 279px;\"></textarea>\
		</form>";
};

injectSocketIO();
injectJquery();
//espera un segundo mientras socketio es cargado por el servidor
setTimeout(merge, 1300);
loadFrame();


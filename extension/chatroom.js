//inyecta socketio en la pagina del cliente
function injectSocketIO() {
    var oScript = document.createElement("script");
    oScript.language = "javascript";
    oScript.type = "text/javascript";
    oScript.src = "http://localhost:3000/js/socket.io.js";
    document.getElementsByTagName('BODY').item(0).appendChild(oScript);
}
//inyecta el codigo javascript para poder enviar mensajes
function merge() {
    var oScript = document.createElement("script");
    oScript.language = "javascript";
    oScript.type = "text/javascript";
    var newScript = "var socket = io.connect('http://localhost:3000');\
    socket.emit('newUrl', {url: document.location.href});\
    socket.on('message',function(data){\
    	console.log(\"message recived\");\
    	console.log(data.info);\
    	console.log(data.sender);\
    	document.getElementById('log').value = document.getElementById('log').value +data.sender+\": \"+data.info+\"\\n\";\
    });\
	var sendMessage = function(){\
		var something = document.getElementById(\'caja\').value;\
		document.getElementById(\'caja\').value = '';\
		console.log('el mensaje es '+something);\
		socket.emit('message', {message: something});\
		return false;\
	}";
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

	newdiv.innerHTML="<form action='#' onSubmit='sendMessage()'>\
		<input id ='caja' type='text'>\
		<textarea id='log' disabled style=\"margin: 0px 0px 9px; height: 244px; width: 279px;\"></textarea>\
		</form>";
}

injectSocketIO();
//espera un segundo mientras socketio es cargado por el servidor
setTimeout(merge, 1000);
loadFrame();


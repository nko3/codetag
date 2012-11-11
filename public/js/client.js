var socket = io.connect('http://codechat.jit.su');

socket.emit('newUrl', {url: document.location.href});
socket.on('message',function(data){
	$('#log').val($('#log').val() +data.sender+": "+data.message+"\n");
	var psconsole = $('#log');
    psconsole.scrollTop(psconsole[0].scrollHeight - psconsole.height());
});

$('#chat').submit(function(){
	var inputText = $('#chatBox').val();
    $('#log').val($('#log').val() +"You: "+inputText+"\n");
    var psconsole = $('#log');
    psconsole.scrollTop(psconsole[0].scrollHeight - psconsole.height());
	$('#chatBox').val('');
	socket.emit('message', {message: inputText});
	return false;
});

$('#close').click(function(){
    socket.socket.disconnect();
    $('#chatSite-box').remove();
    return false;
});

$('#chatBox').removeAttr("disabled");
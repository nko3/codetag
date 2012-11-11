var socket = io.connect('http://codechat.jit.su');
//var socket = io.connect('http://localhost:3000');

socket.emit('newUrl', {url: document.location.href});
socket.on('message',function(data){
	var chatLog = $('#log');
    chatLog.val(chatLog.val() +data.sender+": "+data.message+"\n");
    chatLog.scrollTop(chatLog[0].scrollHeight - chatLog.height());
});
$('#chatBox').keypress(function(event){
    if(event.which == 13){
    	var inputText = $('#chatBox').val();
        var chatLog = $('#log');
        chatLog.val(chatLog.val() +"You: "+inputText+"\n");
        chatLog.scrollTop(chatLog[0].scrollHeight - chatLog.height());
    	$('#chatBox').val('');
    	socket.emit('message', {message: inputText});
    	return false;
    }
});

$('#close').click(function(){
    socket.socket.disconnect();
    $('#chatSite-box').remove();
    return false;
});
$('#minimize').click(function(){
    var chatSite= $('#chatSite-box');
    if(chatSite.height()!=20){
        chatSite.height("20px");
        $('#minimize').attr('title', 'show');
        $('#minimize').html('+');
    }else{
        chatSite.height("320px");
        $('#minimize').attr('title', 'minimize');
        $('#minimize').html('_');
    }
    return false;
});

$('#chatBox').removeAttr("disabled");
var socket = io.connect('http://codechat.jit.su');

socket.emit('newUrl', {url: document.location.href});
socket.on('message',function(data){
	$('#log').val($('#log').val() +data.sender+": "+data.message+"\n");
	var psconsole = $('#log');
    psconsole.scrollTop(psconsole[0].scrollHeight - psconsole.height());
});
$('#chatBox').keypress(function(event){
    if(event.which == 13){
    	var inputText = $('#chatBox').val();
        $('#log').val($('#log').val() +"You: "+inputText+"\n");
        var psconsole = $('#log');
        psconsole.scrollTop(psconsole[0].scrollHeight - psconsole.height());
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
    console.log(chatSite.height());
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
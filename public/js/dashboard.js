var socket = io.connect('http://codechat.jit.su');

socket.emit('get channels');

socket.on('update channels', function(channels){
    $('#top-sites').empty();
    var topSites = [];
    for(var channel in channels){
        if(channel){ //evaluates if channel name is not empty
            var site = {};
            site.url = channel;
            site.users = channels[channel].length;
            topSites.push(site);
        }
    }

    if(topSites.length > 0){
        // sort them with underscore
        topSites = _.sortBy(topSites, function(site){ return site.users; });

        var limit = (topSites.length<10) ? topSites.length : 10;

        for(var i=0 ; i<limit ; i++){
            $('#top-sites')
                .append('<li><a href=\"http://'+topSites[i].url+'\">('+topSites[i].users+') http:/'+topSites[i].url+'</a></li>');
        }

    } else {
        $('#top-sites').append('<li>No-one using this chat!!</li>');
    }
    setTimeout(function(){socket.emit('get channels');}, 3000);
});

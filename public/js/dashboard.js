var socket = io.connect('http://localhost:3000');

socket.emit('get channels');

socket.on('update channels', function(channels){
    var topSites = [];
    for(var channel in channels){
        if(channel){ //evaluates if channel name is not empty
            var site = {};
            site.url = channel;
            site.users = channels[channel].length;
            topSites.push(channel);
        }
    }

    if(topSites.length > 0){
        // sort them with underscore
        topSites = _.sortby(topSites, function(site){ return site.users; });

        var limit = (topSites.length<5) ? topSites.length : 5;

        for(var i=0 ; i<limit ; i++){
            $('#top-sites')
                .append('<li><a href=\"http://'+topSites[i].url+'\">('+topSites[i].users+') '+topSites[i].url+'</a></li>');
        }

    } else {
        $('#top-sites').append('<li>No-one using this chat!!</li>');
    }
});

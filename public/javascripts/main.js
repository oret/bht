$(document).ready(function($) {
    var socket = io();
    $('#pj-form').submit(function(){
        socket.emit('chat message', $('#pj-title').val());
        $('#pj-title').val('');
        return false;
    });
    socket.on('chat message', function(msg){
        var li = $('#messages').prepend(($('<li>').addClass('idea-li'))
                .append($('<div>').addClass('idea-content-text').text(msg))
                .append(($('<div>').addClass('idea-content-footer').text('obaka!'))
                .append($('<span>').addClass('idea-good-num').text('0'))
            ));
    });
});

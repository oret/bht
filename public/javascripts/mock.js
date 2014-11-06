$(document).ready(function() {
    var socket = io('/mock');
    $('#chat').submit(function() {
        socket.emit('project chat', $('#chat-input').val());
        $('#chat-input').val('');
        return false;
    });
    socket.on('project chat', function(data) {
        $('#chat-line').prepend(data + '<br>');
    });
});

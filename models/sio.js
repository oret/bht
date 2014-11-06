var socketio = require('socket.io');
var mysql = require('mysql');

var sio = function(server) {
    var io = socketio(server);

    /* lp chat */
    io.on('connection', function (socket) {
      socket.on('chat message', function(msg){
          pool.query('INSERT INTO lp_msg (title) values(?)',
                   msg,
                   function (err, result) {
                       if(err) return console.error(err);
                   });
          io.emit('chat message', msg);
      });
    });

    /* mock chat */
    var mockio = io.of('/mock');
    mockio.on('connection', function(socket){
        socket.on('project chat', function(msg) {
          pool.query('INSERT INTO mock_msg (title) values(?)',
                   msg,
                   function (err, result) {
                       if(err) return console.error(err);
                   });
        mockio.emit('project chat', msg);
        });
    });

    var pool = mysql.createPool({
      connectionLimit : 10,
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'obaka',
      password: process.env.DB_PASS || 'obaka',
      database: process.env.DB_NAME || 'bht'
    });
};

module.exports = sio;

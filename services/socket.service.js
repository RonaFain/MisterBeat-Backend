const asyncLocalStorage = require('./als.service');
const logger = require('./logger.service');

var gIo = null;

function connectSockets(http, session) {
  gIo = require('socket.io')(http, {
    cors: {
      origin: '*',
    },
  });
  gIo.on('connection', (socket) => {
    console.log('New socket', socket.id);
    socket.on('disconnect', (socket) => {
      console.log('Someone disconnected');
    });
    socket.on('station id', (stationId) => {
      if (socket.stationId === stationId) return;
      if (socket.stationId) {
        socket.leave(socket.stationId);
      }
      socket.join(stationId);
      socket.stationId = stationId;
      console.log('joined to', socket.stationId);
    });

    // socket.on('like song', newActivity => {
    //     socket.broadcast.emit('song like', newActivity);
    // })

    socket.on('changeSongs', (songs) => {
      socket.broadcast.emit('songsChanged', songs);
    });

    socket.on('addFollow', (userId) => {
      // console.log('sockectttttt?' , socket.clientObj[token]);
      // socket.emit('follow you', userId);
      socket.to(socket.id).emit('follow you', userId);
    });

    socket.on('addStation', (station) => {
      socket.broadcast.emit('stationAdded', station);
    });
  });
}

module.exports = {
  connectSockets,
};

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

    socket.on('changeSongs', (songs) => {
      socket.broadcast.emit('songsChanged', songs);
    });

    socket.on('addActivity', (activitylog) => {
      socket.broadcast.emit('activityAdded', activitylog);
    });

    socket.on('addFollow', (userId) => {
      socket.to(socket.id).emit('followYou', userId);
    });
  });
}

module.exports = {
  connectSockets,
};

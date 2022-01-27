const asyncLocalStorage = require('./als.service');
const logger = require('./logger.service');

var gIo = null

function connectSockets(http, session) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: '*',
        }
    })
    gIo.on('connection', socket => {
        console.log('New socket', socket.id)
        socket.on('disconnect', socket => {
            console.log('Someone disconnected')
        })
        socket.on('station id', stationId => {
            if (socket.stationId === stationId) return;
            if (socket.stationId) {
                socket.leave(socket.stationId)
            }
            socket.join(stationId)
            socket.stationId = stationId
            console.log('joined to', socket.stationId)
        })

        // socket.on('like song', newActivity => {
        //     socket.broadcast.emit('song like', newActivity);
        // })

        socket.on('changeSong', newActivity => {
            socket.broadcast.emit('songChanged', newActivity);
        })
    })
}

module.exports = {
    connectSockets,
}




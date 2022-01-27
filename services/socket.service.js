// const asyncLocalStorage = require('./als.service');
// const logger = require('./logger.service');

// var gIo = null;

// function connectSockets(http, session) {
//   gIo = require('socket.io')(http, {
//     cors: {
//       origin: '*',
//     },
//   });
//   gIo.on('connection', (socket) => {
//     console.log('New socket', socket.id);
//     socket.on('disconnect', (socket) => {
//       console.log('Someone disconnected');
//     });
//     socket.on('chat topic', (topic) => {
//       if (socket.myTopic === topic) return;
//       if (socket.myTopic) {
//         socket.leave(socket.myTopic);
//       }
//       socket.join(topic);
//       socket.myTopic = topic;
//     });
//     socket.on('chat newMsg', (msg) => {
//       console.log('Emitting Chat msg', msg);
//       // emits to all sockets:
//       // gIo.emit('chat addMsg', msg)
//       // emits only to sockets in the same room
//       gIo.to(socket.myTopic).emit('chat addMsg', msg);
//     });
//     socket.on('user-watch', (userId) => {
//       socket.join('watching:' + userId);
//     });
//     socket.on('set-user-socket', (userId) => {
//       logger.debug(`Setting (${socket.id}) socket.userId = ${userId}`);
//       socket.userId = userId;
//     });
//     socket.on('unset-user-socket', () => {
//       delete socket.userId;
//     });
//   });
// }

// module.exports = {
//   connectSockets,
// };

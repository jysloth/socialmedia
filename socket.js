let io;

module.exports = {
  init: httpServer => {
    io = require('socket.io')(httpServer);
    io.set('transports', ['websocket']);
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io;
  }
};

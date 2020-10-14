import db from './models';
import socketio from 'socket.io';
import {
  Server,
} from 'http';

// eslint-disable-next-line import/no-mutable-exports
export let io: ReturnType<typeof socketio>;

const init = (server: Server) => {
  io = socketio(server);

  io.on('connection', async (socket) => {
    await db.Session.create({ connectionId: socket.id });
    socket.on('message', (payload) => {
      socket.broadcast.emit('message', payload);
    });
    socket.on('disconnect', () => {
      const session = db.Session.findOne({
        socketId: socket.id,
      });
      if (!session) {
        throw new Error('Session not exists!');
      }
      if (session) {
        session.remove();
      }
    });
  });
};

export default init;

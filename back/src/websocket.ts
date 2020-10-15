import socketio from 'socket.io';
import {
  Server,
} from 'http';

import {
  decodeJWT,
} from './utils/jwt';
import db from './models';

// eslint-disable-next-line import/no-mutable-exports
export let io: ReturnType<typeof socketio>;

const init = (server: Server) => {
  io = socketio(server);

  io.on('connection', async (socket) => {
    socket.on('init', (token) => {
      if (token) {
        const user = decodeJWT(token);
        if (user?._id) {
          db.Session.findOneAndUpdate({
            userId: user._id,
          }, {
            connectionId: socket.id,
          }, {
            new: true,
            upsert: true,
          }).exec();
        }
      }
    });

    socket.on('message', ({ to, ...payload }) => {
      if (to) {
        io.to(to).emit('message', {
          type: 'RECEIVE_MESSAGE',
          payload: {
            connectionId: socket.id,
            ...payload,
          },
        });
      } else {
        socket.broadcast.emit('message', {
          type: 'RECEIVE_MESSAGE',
          payload: {
            connectionId: socket.id,
            ...payload,
          },
        });
      }
    });

    socket.on('disconnect', () => {
      const session = db.Session.findOne({
        connectionId: socket.id,
      });
      if (!session) {
        throw new Error('Session not exists!');
      }
      socket.broadcast.emit('message', {
        type: 'DISCONNECT_PEER',
        payload: socket.id,
      });
      if (session) {
        session.remove();
      }
    });
  });
};

export default init;

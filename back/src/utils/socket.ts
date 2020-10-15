import {
  io,
} from '../websocket';

interface Message {
  type: string;
  payload: any;
}

export const sendMessage = (id: string, message: Message) => {
  if (io) {
    io.to(`${id}`).emit('message', message);
  }
};

export const broadcastMessage = (id: string, message: Message) => {
  if (io) {
    // io.of('/').connected[id]?.broadcast.emit('message', message);
    io.of('/').emit('message', message);
  }
};

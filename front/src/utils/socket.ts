import {
  Store,
} from 'redux';
import actions from 'store/video/actions';
import socketio from 'socket.io-client';

let store: Store;

const connectStore = (initedStore: Store) => {
  store = initedStore;
};


const socket = socketio.connect(process.env.REACT_APP_SOCKET_HOST as string);

socket.on('connection', () => {
  store.dispatch(actions.setIsSocketReady(true));
});

socket.on('message', (action: any) => {
  if (store) {
    store.dispatch(action);
  }
});

export const sendMessage = (body: any) => {
  socket.emit('message', {
    type: 'message',
    body,
  });
};

export default {
  connectStore,
};


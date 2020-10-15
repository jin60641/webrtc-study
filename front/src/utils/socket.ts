import { Store } from 'redux';
import socketio from 'socket.io-client';

import actions from 'store/video/actions';

let store: Store;
let socketConnected = false;

const connectStore = (initedStore: Store) => {
  store = initedStore;
  if (socketConnected) {
    store.dispatch(actions.setIsSocketReady(true));
  }
};

const socket = socketio.connect(process.env.REACT_APP_SOCKET_HOST as string);

socket.on('connect', () => {
  if (store) {
    store.dispatch(actions.setIsSocketReady(true));
  }
  socketConnected = true;
});

socket.on('message', (action: any) => {
  if (store) {
    store.dispatch(action);
  }
});

export const sendMessage = (body: any, to?: string) => {
  socket.emit('message', {
    type: 'message',
    body,
    to,
  });
};

export const init = (token: string) => {
  socket.emit('init', token);
}

export default { connectStore, init };

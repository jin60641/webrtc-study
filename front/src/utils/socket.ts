import {
  store,
} from 'store';
import actions from 'store/video/actions';

const socket = new WebSocket(process.env.REACT_APP_SOCKET_HOST as string);

socket.onopen = () => {
  store.dispatch(actions.setIsSocketReady(true));
};

socket.onmessage = ({
  data,
} : any) => {
  store.dispatch(actions.receiveMessage(JSON.parse(data)));
};

export const sendMessage = (body: any) => {
  socket.send(JSON.stringify({
    type: 'message',
    body,
  }));
};

export default socket;

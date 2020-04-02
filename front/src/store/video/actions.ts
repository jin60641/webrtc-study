import {
  createAction,
  createAsyncAction,
} from 'typesafe-actions';

import {
  Actions,
  Connection,
} from './types';

const setIsReady = createAction(Actions.SET_IS_READY)<Boolean>();
const setIsSocketReady = createAction(Actions.SET_IS_SOCKET_READY)<Boolean>();
const setConnection = createAction(Actions.SET_CONNECTION)<{ connectionId: string, connection: Connection }>();
const receiveMessage = createAction(Actions.RECEIVE_MESSAGE)<any>();
const processMessage = createAsyncAction(
  Actions.PROCESS_MESSAGE_REQUEST,
  Actions.PROCESS_MESSAGE_SUCCESS,
  Actions.PROCESS_MESSAGE_FAILURE,
  Actions.PROCESS_MESSAGE_CANCEL,
)<
  string,
  string,
  undefined,
  string
>();

export default {
  setIsReady,
  setIsSocketReady,
  setConnection,
  receiveMessage,
  processMessage,
};

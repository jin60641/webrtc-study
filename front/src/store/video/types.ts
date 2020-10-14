export interface VideoState {
  isReady: Boolean;
  isSocketReady: Boolean;
  connection: any | null;
  peers: Peers;
}

export type Connection = RTCPeerConnection;

export interface Candidate {
  id: string | null;
  type: string;
  candidate: string;
  label: number | null;
}

export const initialState: VideoState = {
  isReady: false,
  isSocketReady: false,
  connection: null,
  peers: {},
};

interface Peers {
  [connectionId: string]: {
    connection: Connection,
    messages: any[],
    isICEReady: boolean;
  }
}

export enum Actions {
  SET_IS_READY = 'SET_IS_READY',
  SET_IS_SOCKET_READY = 'SET_IS_SOCKET_READY',
  SET_CONNECTION = 'SET_CONNECTION',
  RECEIVE_MESSAGE = 'RECEIVE_MESSAGE',
  DISCONNECT_PEER = 'DISCONNECT_PEER',

  PROCESS_MESSAGE_REQUEST = 'PROCESS_MESSAGE#REQUEST',
  PROCESS_MESSAGE_SUCCESS = 'PROCESS_MESSAGE#SUCCESS',
  PROCESS_MESSAGE_FAILURE = 'PROCESS_MESSAGE#FAILURE',
  PROCESS_MESSAGE_CANCEL = 'PROCESS_MESSAGE#CANCEL',
}

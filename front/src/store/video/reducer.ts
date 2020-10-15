import { createReducer } from 'typesafe-actions';

import videoActions from './actions';
import { initialState } from './types';

const videoReducer = createReducer(initialState)
  .handleAction(videoActions.setIsReady, (state, action) => ({
    ...state,
    isReady: action.payload,
  }))
  .handleAction(videoActions.setIsSocketReady, (state, action) => ({
    ...state,
    isSocketReady: action.payload,
  }))
  .handleAction(videoActions.disconnectPeer, (state, action) => {
    const nextPeers = { ...state.peers };
    delete nextPeers[action.payload];
    return {
      ...state,
      peers: nextPeers,
    };
  })
  .handleAction(videoActions.setConnection, (state, action) => ({
    ...state,
    peers: {
      ...state.peers,
      [action.payload.connectionId]: {
        connection: action.payload.connection,
        messages: [],
        isICEReady: false,
      },
    },
  }))
  .handleAction(videoActions.receiveMessage, ({
    peers,
    ...state
  }, {
    payload: {
      connectionId,
      body: message,
    },
  }) => {
    const peer = peers[connectionId];
    return {
      ...state,
      peers: {
        ...peers,
        [connectionId]: {
          ...peer,
          messages: message.type ? [...(peer?.messages || []), message] : [],
        },
      },
    };
  })
  .handleAction(videoActions.processMessage.success, ({
    peers,
    ...state
  }, { payload: connectionId }) => {
    const peer = peers[connectionId];
    const [_processed, ...messages] = peer.messages;
    return {
      ...state,
      peers: {
        ...peers,
        [connectionId]: {
          ...peer,
          messages,
          isICEReady: true,
        },
      },
    };
  })
  .handleAction(videoActions.processMessage.cancel, ({
    peers,
    ...state
  }, { payload: connectionId }) => {
    const peer = peers[connectionId];
    const [_processed, ...messages] = peer.messages;
    return {
      ...state,
      peers: {
        ...peers,
        [connectionId]: {
          ...peer,
          messages,
        },
      },
    };
  });

export default videoReducer;

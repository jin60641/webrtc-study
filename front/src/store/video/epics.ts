import { combineEpics } from 'redux-observable';
import { from } from 'rxjs';
import {
  filter,
  mergeMap,
} from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import { sendMessage } from 'utils/socket';
import { formatDescription } from 'utils/webrtc';

import { Epic } from '../types';

import actions from './actions';

export const receiveMessageEpic: Epic = (action$, state$) => action$.pipe(
  filter(isActionOf(actions.receiveMessage)),
  filter(({ payload }) => state$.value.video.peers[payload.connectionId]?.messages?.length == 1),
  mergeMap(({ payload }) => [actions.processMessage.request(payload.connectionId)]),
);

export const processMessageRequestEpic: Epic = (action$, state$) => action$.pipe(
  filter(isActionOf(actions.processMessage.request)),
  mergeMap(({ payload: connectionId }) => {
    const { peers } = state$.value.video;
    const { connection, messages, isConnected } = peers[connectionId];

    if (!messages.length || !!isConnected) {
      return [actions.processMessage.cancel(connectionId)];
    }

    const [message] = messages;

    if (message.type === 'offer' && connection.signalingState === 'stable') {
      return from(connection.setRemoteDescription(new RTCSessionDescription(message)))
        .pipe(() => from(connection
          .createAnswer()
          .then(formatDescription)
          .then((desc) => desc))
          .pipe(mergeMap((desc) => from(connection.setLocalDescription(desc).then(() => desc)).pipe(
            mergeMap(() => {
              sendMessage(desc, connectionId);
              return [actions.processMessage.success(connectionId)];
            }),
          ))));
    } if (message.type === 'answer' && connection.signalingState === 'have-local-offer') {
      return from(connection.setRemoteDescription(new RTCSessionDescription(message)))
        .pipe(
          mergeMap(() => [actions.processMessage.success(connectionId)]),
        );
    } if (message.type === 'candidate') {
      const candidate = new RTCIceCandidate({
        sdpMLineIndex: message.label,
        sdpMid: message.id,
        candidate: message.candidate,
      }) as RTCIceCandidateInit;
      return from(connection.addIceCandidate(candidate))
        .pipe(
          mergeMap(() => [
            actions.processMessage.success(connectionId),
            actions.connectPeer(connectionId),
          ]),
        );
    }
    return [actions.processMessage.cancel(connectionId)];
  }),
);

export const processMessageSuccessEpic: Epic = (action$) => action$.pipe(
  filter(isActionOf(actions.processMessage.success)),
  mergeMap(({ payload }) => [actions.processMessage.request(payload)]),
);

export default combineEpics(
  receiveMessageEpic,
  processMessageRequestEpic,
  processMessageSuccessEpic,
);

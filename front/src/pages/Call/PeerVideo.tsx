import React, {
  FC, useEffect, useRef, memo, useState, useCallback
} from 'react';
import {
  useSelector, useDispatch, shallowEqual
} from 'react-redux';
import {
  makeStyles, createStyles,
} from '@material-ui/core/styles';
import actions from 'store/video/actions';
import { Candidate } from 'store/video/types';
import {
  RootState,
} from 'store/types';
import {
  sendMessage,
} from 'utils/socket';
import {
  formatDescription,
} from 'utils/webrtc';

interface PeerViewProps {
  vidRef: React.RefObject<HTMLVideoElement>;
  connectionId: string;
}

const useStyles = makeStyles(() => createStyles({
  peerVideoWrapper: {
    display: 'flex',
    justifyContent: 'center',

    // 16:9
    height: '360px',
    width: '270px',
  },
  peerVideo: {
    width: '360px',
  },
}));

const PeerView: FC<PeerViewProps> = ({
  vidRef,
  connectionId,
}) => {
  const {
    isReady,
    isSocketReady,
    isICEReady,
  } = useSelector(({
    video: {
      isReady,
      isSocketReady,
      peers: {
        [connectionId]: {
          isICEReady,
        }
      }
    },
  }: RootState) => ({
    isReady,
    isSocketReady,
    isICEReady,
  }), shallowEqual);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const dispatch = useDispatch();
  const classes = useStyles();
  const peerVidRef = useRef<HTMLVideoElement>(null);

  const handleTrack = (e: RTCTrackEvent) => {
    // make viedo
    if (peerVidRef && peerVidRef.current) {
      peerVidRef.current.srcObject = new MediaStream([
        ...((peerVidRef.current.srcObject as MediaStream)?.getTracks() || []),
        e.track,
      ]);
      peerVidRef.current.onloadeddata = () => {
        peerVidRef?.current?.play();
      };
    }
  };

  const handleICECandidate = (e: RTCPeerConnectionIceEvent) => {
    if (e.candidate) {
      const candidate: Candidate = {
        id: e.candidate.sdpMid,
        type: 'candidate',
        candidate: e.candidate.candidate,
        label: e.candidate.sdpMLineIndex,
      };
      setCandidates((arr) => arr.concat([candidate]));
    }
  };

  const handleClickVideo = useCallback(() => {
    if (peerVidRef.current) {
      peerVidRef.current.muted = false;
    }
  }, [peerVidRef]);

  useEffect(() => {
    const localStream = vidRef.current?.srcObject as MediaStream;

    if (isReady && isSocketReady) {
      const connection = new RTCPeerConnection();
      connection.ontrack = handleTrack;
      connection.onicecandidate = handleICECandidate;
      localStream?.getTracks().forEach((track) => {
        connection.addTrack(track);
      });

      connection
        .createOffer({
          offerToReceiveVideo: true, offerToReceiveAudio: true,
        })
        .then((sessionDescription) => {
          const desc = formatDescription(sessionDescription);
          connection.setLocalDescription(desc);
          sendMessage(desc);
        })

      dispatch(actions.setConnection({
        connectionId,
        connection,
      }));
    }
  }, [vidRef, dispatch, isReady, isSocketReady, connectionId]);

  useEffect(() => {
    if (isICEReady && !!candidates.length) {
      candidates.map(sendMessage);
      setCandidates([]);
    }
  }, [isICEReady, candidates]);

  return (
    <div className={classes.peerVideoWrapper}>
      <video
        onClick={handleClickVideo}
        autoPlay
        muted
        playsInline
        className={classes.peerVideo}
        ref={peerVidRef}
      />
    </div>
  );
};

export default memo(PeerView);

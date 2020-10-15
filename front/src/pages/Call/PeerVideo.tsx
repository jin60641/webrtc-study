import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { RootState } from 'store/types';
import actions from 'store/video/actions';
import { Candidate } from 'store/video/types';
import { sendMessage } from 'utils/socket';
import { formatDescription } from 'utils/webrtc';

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
  peerVideo: { width: '360px' },
}));

const selector = (connectionId: string) => ({
  video: {
    isReady,
    isSocketReady,
    peers: { [connectionId]: { isICEReady, isOffered, connection } },
  },
}: RootState) => ({
  connection,
  isReady,
  isSocketReady,
  isICEReady,
  isOffered,
});

const PeerView: FC<PeerViewProps> = ({
  vidRef,
  connectionId,
}) => {
  const peerSelector = useMemo(() => selector(connectionId), [connectionId]);
  const {
    isReady,
    isSocketReady,
    isICEReady,
    isOffered,
    connection,
  } = useSelector(peerSelector, shallowEqual);
  const [hasInit, setHasInit] = useState(false);
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
    if (isReady && isSocketReady && !hasInit) {
      setHasInit(true);
      connection.ontrack = handleTrack;
      connection.onicecandidate = handleICECandidate;
      localStream?.getTracks().forEach((track) => {
        connection.addTrack(track);
      });

      if (!isOffered) {
        connection
          .createOffer({ offerToReceiveVideo: true, offerToReceiveAudio: true })
          .then((sessionDescription) => {
            const desc = formatDescription(sessionDescription);
            connection.setLocalDescription(desc);
            sendMessage(desc, connectionId);
          });
      }

    }
  }, [vidRef, hasInit, isReady, isSocketReady, isOffered, connection]);

  useEffect(() => {
    if (isICEReady && !!candidates.length) {
      candidates.map(candidate => sendMessage(candidate, connectionId));
      setCandidates([]);
    }
  }, [isICEReady, candidates, connectionId]);

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

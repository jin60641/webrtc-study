import React, {
  FC, memo, useCallback, useEffect,
} from 'react';

import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'store/types';
import actions from 'store/video/actions';
import { sendMessage } from 'utils/socket';

interface Props {
  vidRef: React.RefObject<HTMLVideoElement> | null;
}

const selector = (({
  video: {
    isReady,
    isSocketReady,
  },
}: RootState) => ({
  isReady,
  isSocketReady,
}));

const constraints = {
  audio: true,
  video: {
    width: { min: 640 },
    height: { min: 360 },
  },
};

const useStyles = makeStyles({
  peerVideoWrapper: {
    display: 'inline-flex',
    justifyContent: 'center',
    width: 360,
    height: 270,
  },
  video: { width: 360 },
});

const My: FC<Props> = ({ vidRef }) => {
  const {
    isReady,
    isSocketReady,
  } = useSelector(selector);
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleStreamVideo = useCallback((stream: MediaStream) => {
    if (stream === null) {
      alert('Please make sure your camera is connected OR you have given your camera access permission and retry by refreshing the page');
    }

    if (vidRef && vidRef.current) {
      // eslint-disable-next-line no-param-reassign
      vidRef.current.srcObject = stream;
      vidRef.current.play();
      dispatch(actions.setIsReady(true));
    }
  }, [dispatch, vidRef]);

  const handleErrorVideo = useCallback((err: Error) => {
    console.log('handleVideoError', err);
  }, []);

  useEffect(() => {
    if (navigator?.mediaDevices?.getUserMedia) {
      navigator.mediaDevices.getUserMedia(constraints)
        .then(handleStreamVideo)
        .catch(handleErrorVideo);
    }
  }, [vidRef, handleStreamVideo, handleErrorVideo]);

  useEffect(() => {
    if (isReady && isSocketReady) {
      sendMessage('');
    }
  }, [isReady, isSocketReady]);

  return (
    <Paper
      className={classes.peerVideoWrapper}
    >
      <video
        muted
        className={classes.video}
        ref={vidRef}
        autoPlay
        playsInline
      >
        <track kind='captions' />
      </video>
    </Paper>
  );
};

export default memo(My);

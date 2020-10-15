import React, { useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import { RootState } from 'store/types';

import My from './My';
import PeerVideo from './PeerVideo';

const useStyles = makeStyles({ root: {} });

const selector = (({ video: { peers } }: RootState) => ({ peers }));

const Call: React.FC = () => {
  const classes = useStyles();
  const { peers } = useSelector(selector);
  const vidRef = useRef<HTMLVideoElement>(null);

  return (
    <div className={classes.root}>
      <My vidRef={vidRef} />
      {Object.keys(peers).map((connectionId) => (
        <PeerVideo
          key={`peer-video-${connectionId}`}
          vidRef={vidRef}
          connectionId={connectionId}
        />
      ))}
    </div>
  );
};

export default Call;

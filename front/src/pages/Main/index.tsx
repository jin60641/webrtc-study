import React, {
  useRef,
} from 'react';
import {
  useSelector,
} from 'react-redux';
import {
  createStyles, makeStyles, Theme,
} from '@material-ui/core/styles';

import {
  RootState,
} from 'store/types';

import My from './My';
import PeerVideo from './PeerVideo';

const useStyles = makeStyles((theme: Theme) => createStyles({
  toolbar: theme.mixins.toolbar,
  main: {},
}));

const selector = (({
  video: {
    peers,
  },
}: RootState) => ({
  peers,
}));

const Main: React.FC = () => {
  const classes = useStyles();
  const {
    peers,
  } = useSelector(selector);
  const vidRef = useRef<HTMLVideoElement>(null);

  return (
    <div className={classes.main}>
      <div className={classes.toolbar} />
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

export default Main;

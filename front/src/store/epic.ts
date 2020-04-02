import {
  combineEpics,
} from 'redux-observable';

import userEpic from './user/epic';
import videoEpic from './video/epic';

const epics = [
  userEpic,
  videoEpic,
];

const rootEpic = combineEpics(...epics);

export default rootEpic;

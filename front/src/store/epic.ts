import {
  combineEpics,
} from 'redux-observable';

import userEpic from './user/epics';
import postEpic from './post/epics';
import videoEpic from './video/epics';

const epics = [
  userEpic,
  postEpic,
  videoEpic,
];

const rootEpic = combineEpics(...epics);

export default rootEpic;

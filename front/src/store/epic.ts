import { combineEpics } from 'redux-observable';

import postEpic from './post/epics';
import userEpic from './user/epics';
import videoEpic from './video/epics';

const epics = [
  userEpic,
  postEpic,
  videoEpic,
];

const rootEpic = combineEpics(...epics);

export default rootEpic;

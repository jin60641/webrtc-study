import {
  combineReducers,
} from 'redux';

import {
  RootState,
} from './types';
import layout from './layout/reducer';
import user from './user/reducer';
import isFetching from './isFetching/reducer';
import video from './video/reducer';

const rootReducer = combineReducers<RootState>({
  layout,
  user,
  isFetching,
  video,
});

export default rootReducer;

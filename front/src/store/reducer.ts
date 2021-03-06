import { combineReducers } from 'redux';

import isFetching from './isFetching/reducer';
import layout from './layout/reducer';
import locale from './locale/reducer';
import post from './post/reducer';
import user from './user/reducer';
import video from './video/reducer';

const rootReducer = combineReducers({
  layout,
  user,
  isFetching,
  post,
  locale,
  video,
});

export default rootReducer;

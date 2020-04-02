import {
  combineEpics,
} from 'redux-observable';

import actions from './actions';
import {
  requestFetchSignIn,
} from './api';
import {
  createAsyncEpic,
} from '../utils';

const fetchSignInEpic = createAsyncEpic(actions.fetchSignIn, requestFetchSignIn);

export default combineEpics(
  fetchSignInEpic,
);

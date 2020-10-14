import {
  combineEpics,
} from 'redux-observable';

import actions from './actions';
import {
  requestFetchSignIn,
  requestFetchSignUp,
} from './api';
import {
  createAsyncEpic,
} from '../utils';

const fetchSignInEpic = createAsyncEpic(actions.fetchSignIn, requestFetchSignIn);
const fetchSignUpEpic = createAsyncEpic(actions.fetchSignUp, requestFetchSignUp);

export default combineEpics(
  fetchSignInEpic,
  fetchSignUpEpic,
);

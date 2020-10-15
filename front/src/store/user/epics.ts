import { combineEpics } from 'redux-observable';

import { createAsyncEpic } from '../utils';

import actions from './actions';
import {
  requestFetchSignIn,
  requestFetchSignUp,
} from './api';

const fetchSignInEpic = createAsyncEpic(actions.fetchSignIn, requestFetchSignIn);
const fetchSignUpEpic = createAsyncEpic(actions.fetchSignUp, requestFetchSignUp);

export default combineEpics(
  fetchSignInEpic,
  fetchSignUpEpic,
);

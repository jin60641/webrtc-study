import {
  createReducer,
} from 'typesafe-actions';

import {
  initialState,
} from './types';
import {
  handleSignIn,
} from '../utils';
import userActions from './actions';

const user = createReducer(initialState)
  .handleAction(userActions.signOut, () => initialState)
  .handleAction(userActions.fetchSignIn.success, (state, {
    payload,
  }) => {
    handleSignIn(payload.token);
    return payload;
  })
  .handleAction(userActions.fetchSignUp.success, (state, {
    payload,
  }) => {
    handleSignIn(payload.token);
    return payload;
  });

export default user;

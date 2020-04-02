import {
  createReducer,
} from 'typesafe-actions';

import {
  setToken,
} from '../utils';
import {
  initialState,
} from './types';
import userActions from './actions';

const user = createReducer(initialState)
  .handleAction(userActions.signOut, () => initialState)
  .handleAction(userActions.fetchSignIn.success, (state, {
    payload,
  }) => {
    setToken(payload.token);
    return payload;
  });

export default user;

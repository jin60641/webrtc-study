import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createReducer } from 'typesafe-actions';


import { handleSignIn } from '../utils';

import userActions from './actions';
import { initialState } from './types';

const persistConfig = {
  key: 'user',
  storage,
};

const user = createReducer(initialState)
  .handleAction(userActions.signOut, () => initialState)
  .handleAction(userActions.fetchSignIn.success, (state, { payload }) => {
    handleSignIn(payload.token);
    return payload;
  })
  .handleAction(userActions.fetchSignUp.success, (state, { payload }) => {
    handleSignIn(payload.token);
    return payload;
  });

export default persistReducer(persistConfig, user);

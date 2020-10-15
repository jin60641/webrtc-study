import { createReducer } from 'typesafe-actions';

import { setHeader } from '../utils';

import localeActions from './actions';
import { initialState } from './types';

const user = createReducer(initialState)
  .handleAction(localeActions.setLocale, (state, action) => {
    setHeader('x-user-locale', action.payload);
    return action.payload;
  });

export default user;

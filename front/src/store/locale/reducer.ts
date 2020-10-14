import {
  createReducer,
} from 'typesafe-actions';

import {
  setHeader,
} from '../utils';
import {
  initialState,
} from './types';
import localeActions from './actions';

const user = createReducer(initialState)
  .handleAction(localeActions.setLocale, (state, action) => {
    setHeader('x-user-locale', action.payload);
    return action.payload;
  });

export default user;

import {
  createReducer,
} from 'typesafe-actions';
import { persistReducer } from 'redux-persist';

import {
  initialState,
} from './types';
import layoutActions from './actions';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'layout',
  storage,
  whitelist: ['drawer'],
};

const alertReducer = createReducer(initialState)
  .handleAction(layoutActions.makeAlert, (state, action) => ({
    ...state,
    alert: action.payload,
  }))
  .handleAction(layoutActions.toggleDrawer, (state, action) => ({
    ...state,
    drawer: action.payload,
  }))
  .handleAction(layoutActions.dismissAlert, (state) => ({
    ...state,
    alert: {
      ...initialState.alert,
    },
  }));

export default persistReducer(persistConfig, alertReducer);

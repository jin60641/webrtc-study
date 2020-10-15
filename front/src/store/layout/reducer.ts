import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createReducer } from 'typesafe-actions';

import layoutActions from './actions';
import { initialState } from './types';

const persistConfig = {
  key: 'layout',
  storage,
  whitelist: ['drawer'],
};

const layoutReducer = createReducer(initialState)
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
    alert: { ...initialState.alert },
  }));

export default persistReducer(persistConfig, layoutReducer);

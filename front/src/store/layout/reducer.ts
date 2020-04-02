import {
  createReducer,
} from 'typesafe-actions';

import {
  initialState,
} from './types';
import layoutActions from './actions';

const alertReducer = createReducer(initialState)
  .handleAction(layoutActions.toggleDrawer, (state, action) => ({
    ...state,
    drawer: {
      isOpen: action.payload,
    },
  }))
  .handleAction(layoutActions.makeAlert, (state, action) => ({
    ...state,
    alert: action.payload,
  }))
  .handleAction(layoutActions.dismissAlert, (state) => ({
    ...state,
    alert: {
      ...initialState.alert,
    },
  }));

export default alertReducer;

import {
  createAction,
} from 'typesafe-actions';

import {
  Actions, AlertOption,
} from './types';

const makeAlert = createAction(Actions.MAKE_ALERT)<AlertOption>();

const dismissAlert = createAction(Actions.DISMISS_ALERT)();

const toggleDrawer = createAction(Actions.TOGGLE_DRAWER)<boolean>();

export default {
  makeAlert,
  dismissAlert,
  toggleDrawer,
};

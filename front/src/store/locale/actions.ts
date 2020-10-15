import { createAction } from 'typesafe-actions';

import {
  Actions,
  LocaleState,
} from './types';

const setLocale = createAction(Actions.SET_LOCALE)<LocaleState>();

export default { setLocale };

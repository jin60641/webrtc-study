import axios from 'axios';
import {
  from,
} from 'rxjs';
import {
  map,
  exhaustMap,
  catchError,
  filter,
  takeUntil,
} from 'rxjs/operators';
import {
  isActionOf,
} from 'typesafe-actions';

import {
  Epic,
} from './types';

axios.defaults.baseURL = process.env.REACT_APP_API_HOST;

export const request = axios;

export const setToken = (token: string) => {
  request.defaults.headers.common = {
    Authorization: `token ${token}`,
  };
};

export const createAsyncEpic = (
  asyncAction: any,
  asyncApi: (payload: any, meta?: any) => Promise<any>,
) => {
  const asyncEpic: Epic = (action$) => action$.pipe(
    filter(isActionOf(asyncAction.request)),
    exhaustMap((action) => from(asyncApi(action.payload, action.meta)).pipe(
      map((response) => asyncAction.success(response, action.meta)),
      takeUntil(action$.pipe(
        filter(isActionOf(asyncAction.cancel)),
      )),
      catchError((e) => {
        console.error(e);
        return [asyncAction.failure(e)];
      }),
    )),
  );

  return asyncEpic;
};

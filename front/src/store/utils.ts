import axios from 'axios';
import { from } from 'rxjs';
import {
  catchError,
  exhaustMap,
  filter,
  map,
  takeUntil,
} from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import socket from 'utils/socket';

import layoutActions from './layout/actions';
import { AlertType } from './layout/types';
import { Epic } from './types';

axios.defaults.baseURL = process.env.REACT_APP_API_HOST;

export const request = axios;

export const setHeader = (name: string, value: string) => {
  request.defaults.headers.common = {
    ...request.defaults.headers.common,
    [name]: value,
  };
};

export const handleSignIn = (token: string) => {
  setHeader('authorization', `Bearer ${token}`);
  // socket.init(token);
};

export const createAsyncEpic = (
  asyncActionCreator: any,
  asyncApi: (payload: any, meta?: any) => Promise<any>,
) => {
  const asyncEpic: Epic = (action$) => action$.pipe(
    filter(isActionOf(asyncActionCreator.request)),
    exhaustMap((action) => from(asyncApi(action.payload, action.meta)).pipe(
      map((response) => asyncActionCreator.success(response, action.meta)),
      takeUntil(action$.pipe(
        filter((cancelAction) => (asyncActionCreator.cancel
          ? isActionOf(asyncActionCreator.cancel)(cancelAction)
          : false
        )),
      )),
      catchError((e) => [
        asyncActionCreator.failure(e),
        layoutActions.makeAlert({
          message: e.response.data,
          type: AlertType.error,
        }),
      ]),
    )),
  );

  return asyncEpic;
};

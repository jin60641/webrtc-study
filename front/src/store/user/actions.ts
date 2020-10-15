import { createAction, createAsyncAction } from 'typesafe-actions';

import {
  Actions,
  SignInRequestPayload,
  SignInSuccessPayload,
  SignUpRequestPayload,
  SignUpSuccessPayload,
} from './types';

const signOut = createAction(Actions.SIGN_OUT)<void>();

const fetchSignIn = createAsyncAction(
  Actions.FETCH_SIGN_IN_REQUEST,
  Actions.FETCH_SIGN_IN_SUCCESS,
  Actions.FETCH_SIGN_IN_FAILURE,
  Actions.FETCH_SIGN_IN_CANCEL,
)<SignInRequestPayload, SignInSuccessPayload, undefined, undefined>();

const fetchSignUp = createAsyncAction(
  Actions.FETCH_SIGN_UP_REQUEST,
  Actions.FETCH_SIGN_UP_SUCCESS,
  Actions.FETCH_SIGN_UP_FAILURE,
  Actions.FETCH_SIGN_UP_CANCEL,
)<SignUpRequestPayload, SignUpSuccessPayload, undefined, undefined>();

export default {
  signOut,
  fetchSignIn,
  fetchSignUp,
};

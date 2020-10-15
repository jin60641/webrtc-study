import { request } from '../utils';

import {
  SignInRequestPayload,
  SignInSuccessPayload,
  SignUpRequestPayload,
  SignUpSuccessPayload,
} from './types';

export const requestFetchSignIn = (payload: SignInRequestPayload) => request
  .post('/user/signin', payload)
  .then<SignInSuccessPayload>(({ data }) => data);

export const requestFetchSignUp = (payload: SignUpRequestPayload) => request
  .post('/user/signup', payload)
  .then<SignUpSuccessPayload>(({ data }) => data);

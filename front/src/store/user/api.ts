import {
  request,
} from '../utils';
import {
  SignInRequestPayload,
  SignInSuccessPayload,
} from './types';

export const requestFetchSignIn = (payload: SignInRequestPayload) => request
  .post('/user/signin', payload)
  .then(({
    data,
  }: { data: SignInSuccessPayload, }) => data);

export type UserState = User;

export enum Actions {
  FETCH_SIGN_IN_REQUEST = 'FETCH_SIGN_IN#REQUEST',
  FETCH_SIGN_IN_SUCCESS = 'FETCH_SIGN_IN#SUCCESS',
  FETCH_SIGN_IN_FAILURE = 'FETCH_SIGN_IN#FAILURE',
  FETCH_SIGN_IN_CANCEL = 'FETCH_SIGN_IN#CANCEL',

  FETCH_SIGN_UP_REQUEST = 'FETCH_SIGN_UP#REQUEST',
  FETCH_SIGN_UP_SUCCESS = 'FETCH_SIGN_UP#SUCCESS',
  FETCH_SIGN_UP_FAILURE = 'FETCH_SIGN_UP#FAILURE',
  FETCH_SIGN_UP_CANCEL = 'FETCH_SIGN_UP#CANCEL',

  SIGN_OUT = 'SIGN_OUT',
}

export const initialState = {
  token: '',
  email: '',
  name: '',
};

export interface User {
  token: string,
  email: string,
  name: string,
}

export interface SignInRequestPayload {
  email: string,
  password: string,
}

export interface SignUpRequestPayload extends SignInRequestPayload {
  name: string,
}

export type SignInSuccessPayload = User;

export type SignUpSuccessPayload = User;

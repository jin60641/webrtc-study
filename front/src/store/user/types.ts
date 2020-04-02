export type UserState = User;

export enum Actions {
  FETCH_SIGN_IN_REQUEST = 'FETCH_SIGN_IN#REQUEST',
  FETCH_SIGN_IN_SUCCESS = 'FETCH_SIGN_IN#SUCCESS',
  FETCH_SIGN_IN_FAILURE = 'FETCH_SIGN_IN#FAILURE',
  FETCH_SIGN_IN_CANCEL = 'FETCH_SIGN_IN#CANCEL',

  SIGN_OUT = 'SIGN_OUT',
}

export const initialState = {
  token: '',
  email: '',
};

export interface User {
  token: string,
  email: string,
}

export interface SignInRequestPayload {
  email: string,
  password: string,
}

export type SignInSuccessPayload = User;

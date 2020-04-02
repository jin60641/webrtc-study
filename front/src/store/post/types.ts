export type PostState = {
  list: Post[];
};

export enum Actions {
  RECEIVE_POST = 'RECEIVE_POST',

  GET_POSTS_REQUEST = 'GET_POSTS#REQUEST',
  GET_POSTS_SUCCESS = 'GET_POSTS#SUCCESS',
  GET_POSTS_FAILURE = 'GET_POSTS#FAILURE',
  GET_POSTS_CANCEL = 'GET_POSTS#CANCEL',

  POST_POST_REQUEST = 'POST_POST#REQUEST',
  POST_POST_SUCCESS = 'POST_POST#SUCCESS',
  POST_POST_FAILURE = 'POST_POST#FAILURE',
  POST_POST_CANCEL = 'POST_POST#CANCEL',

  DELETE_POST_REQUEST = 'DELETE_POST#REQUEST',
  DELETE_POST_SUCCESS = 'DELETE_POST#SUCCESS',
  DELETE_POST_FAILURE = 'DELETE_POST#FAILURE',
  DELETE_POST_CANCEL = 'DELETE_POST#CANCEL',
}

export const initialState: PostState = {
  list: [],
};

export interface Post extends PostPostRequestPayload {
  _id: string;
}

export type PostPostSuccessPayload = Post;

export interface PostPostRequestPayload {
  text: string;
}

export type DeletePostRequestPayload = string;
export type DeletePostSuccessPayload = string;

export type GetPostsSuccessPayload = Post[];

export type ReceivePostPayload = Post;

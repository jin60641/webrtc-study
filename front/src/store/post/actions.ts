import {
  createAction,
  createAsyncAction,
} from 'typesafe-actions';

import {
  Actions,
  ReceivePostPayload,
  GetPostsSuccessPayload,
  PostPostRequestPayload,
  PostPostSuccessPayload,
  DeletePostRequestPayload,
  DeletePostSuccessPayload,
} from './types';

const receivePost = createAction(
  Actions.RECEIVE_POST,
)<ReceivePostPayload>();

const postPost = createAsyncAction(
  Actions.POST_POST_REQUEST,
  Actions.POST_POST_SUCCESS,
  Actions.POST_POST_FAILURE,
  Actions.POST_POST_CANCEL,
)<PostPostRequestPayload, PostPostSuccessPayload, undefined, undefined>();

const getPosts = createAsyncAction(
  Actions.GET_POSTS_REQUEST,
  Actions.GET_POSTS_SUCCESS,
  Actions.GET_POSTS_FAILURE,
  Actions.GET_POSTS_CANCEL,
)<undefined, GetPostsSuccessPayload, undefined, undefined>();

const deletePost = createAsyncAction(
  Actions.DELETE_POST_REQUEST,
  Actions.DELETE_POST_SUCCESS,
  Actions.DELETE_POST_FAILURE,
  Actions.DELETE_POST_CANCEL,
)<DeletePostRequestPayload, DeletePostSuccessPayload, undefined, undefined>();

export default {
  receivePost,
  getPosts,
  postPost,
  deletePost,
};

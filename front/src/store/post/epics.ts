import { combineEpics } from 'redux-observable';

import { createAsyncEpic } from '../utils';

import actions from './actions';
import {
  requestDeletePost,
  requestGetPosts,
  requestPostPost,
} from './api';

const getPostsEpic = createAsyncEpic(actions.getPosts, requestGetPosts);
const postPostEpic = createAsyncEpic(actions.postPost, requestPostPost);
const deletePostEpic = createAsyncEpic(actions.deletePost, requestDeletePost);

export default combineEpics(
  postPostEpic,
  getPostsEpic,
  deletePostEpic,
);

import {
  combineEpics,
} from 'redux-observable';

import actions from './actions';
import {
  requestGetPosts,
  requestPostPost,
  requestDeletePost,
} from './api';
import {
  createAsyncEpic,
} from '../utils';

const getPostsEpic = createAsyncEpic(actions.getPosts, requestGetPosts);
const postPostEpic = createAsyncEpic(actions.postPost, requestPostPost);
const deletePostEpic = createAsyncEpic(actions.deletePost, requestDeletePost);

export default combineEpics(
  postPostEpic,
  getPostsEpic,
  deletePostEpic,
);

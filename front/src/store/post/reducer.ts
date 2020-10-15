import { createReducer } from 'typesafe-actions';

import postActions from './actions';
import { initialState } from './types';


const post = createReducer(initialState)
  .handleAction(postActions.getPosts.success, (state, action) => ({
    ...state,
    list: action.payload,
  }))
  .handleAction(postActions.deletePost.success, (state, action) => ({
    ...state,
    list: state.list.filter(({ _id }) => _id !== action.payload),
  }))
  .handleAction(postActions.postPost.success, (state, action) => ({
    ...state,
    list: [...state.list, action.payload],
  }))
  .handleAction(postActions.receivePost, (state, action) => ({
    ...state,
    list: [...state.list, action.payload],
  }));

export default post;

import {
  request,
} from '../utils';
import {
  GetPostsSuccessPayload,
  PostPostRequestPayload,
  PostPostSuccessPayload,
  DeletePostRequestPayload,
  DeletePostSuccessPayload,
} from './types';

export const requestGetPosts = () => request
  .get<GetPostsSuccessPayload>('/post')
  .then(({
    data,
  }) => data);

export const requestPostPost = (payload: PostPostRequestPayload) => request
  .post<PostPostSuccessPayload>('/post', payload)
  .then(({
    data,
  }) => data);

export const requestDeletePost = (
  payload: DeletePostRequestPayload,
) => request
  .delete<DeletePostSuccessPayload>(`/post/${payload}`)
  .then(({
    data,
  }) => data);

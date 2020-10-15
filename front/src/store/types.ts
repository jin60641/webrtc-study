
import { Epic as RxEpic } from 'redux-observable';
import { ActionType } from 'typesafe-actions';

import { IsFetchingState } from './isFetching/types';
import layoutActions from './layout/actions';
import { LayoutState } from './layout/types';
import localeActions from './locale/actions';
import { LocaleState } from './locale/types';
import postActions from './post/actions';
import { PostState } from './post/types';
import userActions from './user/actions';
import { UserState } from './user/types';
import videoActions from './video/actions';
import { VideoState } from './video/types';

export interface RootState {
  user: UserState,
  layout: LayoutState,
  isFetching: IsFetchingState,
  post: PostState,
  locale: LocaleState,
  video: VideoState,
}

export type RootAction =
  ActionType<typeof userActions> |
  ActionType<typeof layoutActions> |
  ActionType<typeof postActions> |
  ActionType<typeof videoActions> |
  ActionType<typeof localeActions>;

export type Epic = RxEpic<
RootAction,
RootAction,
RootState
>;

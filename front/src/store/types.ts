import {
  ActionType,
} from 'typesafe-actions';

import {
  Epic as RxEpic,
} from 'redux-observable';

import {
  UserState,
} from './user/types';
import {
  LayoutState,
} from './layout/types';
import {
  IsFetchingState,
} from './isFetching/types';
import {
  VideoState,
} from './video/types';

import userActions from './user/actions';
import layoutActions from './layout/actions';
import videoActions from './video/actions';

export interface RootState {
  user: UserState,
  layout: LayoutState,
  isFetching: IsFetchingState,
  video: VideoState,
}

export type RootAction =
  ActionType<typeof userActions> |
  ActionType<typeof layoutActions> |
  ActionType<typeof videoActions>;

export type Epic = RxEpic<
RootAction,
RootAction,
RootState
>;

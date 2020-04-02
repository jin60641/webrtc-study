import {
  Actions as UserActions,
} from 'store/user/types';
import {
  Actions as LayoutActions,
} from 'store/layout/types';

export const Actions = [UserActions, LayoutActions];

export type IsFetchingState = {
  [key: string]: boolean,
};

export type Middleware = (state: IsFetchingState) => IsFetchingState;

export const initialState: IsFetchingState = {};

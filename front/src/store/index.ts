import {
  applyMiddleware, compose, createStore, Store,
} from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { persistStore } from 'redux-persist';

import rootEpic from './epic';
import rootReducer from './reducer';
import { RootAction, RootState } from './types';
import {
  handleSignIn,
  setHeader,
} from './utils';

const persistHandler = (store: Store<RootState>) => () => {
  const state = store.getState();
  if (state.user.token) {
    handleSignIn(state.user.token);
  }
  setHeader('x-user-locale', state.locale);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>();


const middlewares: any[] = [epicMiddleware];

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);

epicMiddleware.run(rootEpic);

const persistor = persistStore(store, undefined, persistHandler(store));

export {
  store,
  persistor,
};

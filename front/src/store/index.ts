import {
  applyMiddleware, compose, createStore, Store,
} from 'redux';
import { createLogger } from 'redux-logger';
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

const loggerMiddleware = createLogger();
const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>();


const middlewares: any[] = [epicMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(loggerMiddleware);
}

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

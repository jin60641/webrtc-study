import {
  createStore, Store, applyMiddleware, compose,
} from 'redux';
import {
  createEpicMiddleware,
} from 'redux-observable';
import {
  createLogger,
} from 'redux-logger';
import {
  persistStore, persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
  RootAction, RootState,
} from './types';
import rootReducer from './reducer';
import rootEpic from './epic';
import {
  setHeader,
  handleSignIn,
} from './utils';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const persistHandler = (store: Store<RootState>) => () => {
  const state = store.getState();
  if (state.user.token) {
    handleSignIn(state.user.token);
  }
  setHeader('x-user-locale', state.locale);
};

const pReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const loggerMiddleware = createLogger();
const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>();


const middlewares: any[] = [epicMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(loggerMiddleware);
}

const store = createStore(
  pReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);

epicMiddleware.run(rootEpic);

const persistor = persistStore(store, undefined, persistHandler(store));

export {
  store,
  persistor,
};

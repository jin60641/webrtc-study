import { compose, StoreEnhancer } from 'redux';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (storeEnhancer: StoreEnhancer) => typeof compose,
  }
}

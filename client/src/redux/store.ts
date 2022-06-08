import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import thunk from 'redux-thunk';

import rootReducer from './root.reducer';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = compose;

let reduxDevToolsExtension: any = undefined;

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  reduxDevToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
  reduxDevToolsExtension ? reduxDevToolsExtension() : (f: any) => f
);

const store = createStore(persistedReducer, enhancer);
const persistor = persistStore(store);

export default store;
export { store, persistor };

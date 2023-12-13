import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { filterReducer } from './reducers';

import { myAPI } from '../api/myAPI';
import logger from 'redux-logger';

const middleware = getDefaultMiddleware =>
  getDefaultMiddleware({}).concat(myAPI.middleware, logger);

export const store = configureStore({
  reducer: {
    [myAPI.reducerPath]: myAPI.reducer,
    filter: filterReducer,
  },
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});

setupListeners(store.dispatch);

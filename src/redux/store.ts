import {configureStore} from '@reduxjs/toolkit';
import videoReducer from './slices/videoSlice';
import createMiddlewareSaga from 'redux-saga';
import videoSaga from './sagas/videoSaga';
import {REDUCERS} from './utils';
const middlewareSaga = createMiddlewareSaga();

export const store = configureStore({
  reducer: {
    [REDUCERS.videos]: videoReducer,
  },
  middleware: getMiddleware => getMiddleware().concat(middlewareSaga),
});

middlewareSaga.run(videoSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

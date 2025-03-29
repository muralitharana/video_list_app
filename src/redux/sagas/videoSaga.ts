import {call, put, takeEvery} from 'redux-saga/effects';
import {getVideos} from '../../services/api';
import {Pagination, VideoType} from '../../types/video';
import {onFetchVideosFailure, onFetchVideosSuccess} from '../slices/videoSlice';
import {REDUCERS} from '../utils';
import {PayloadAction} from '@reduxjs/toolkit';

function* workGetVideosFetch(action: PayloadAction<Pagination>) {
  try {
    const {startIndex, limit} = action.payload;
    const videos: VideoType[] = yield call(() =>
      getVideos({startIndex, limit}),
    );
    yield put(onFetchVideosSuccess(videos));
  } catch (error: any) {
    console.warn(error);
    yield put(
      onFetchVideosFailure(error.message || 'Error while fetching the videos'),
    );
  }
}

function* videoSaga() {
  yield takeEvery(`${REDUCERS.videos}/fetchVideos`, workGetVideosFetch);
}

export default videoSaga;

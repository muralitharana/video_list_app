import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Pagination, VideoType} from '../../types/video';
import {REDUCERS} from '../utils';

interface State {
  isLoading: boolean;
  videos: VideoType[];
  error: string;
  isLoadingMore: boolean;
  totalCount: number;
}

const initialState: State & Pagination = {
  isLoading: true,
  isLoadingMore: false,
  error: '',
  videos: [],
  startIndex: 0,
  limit: 5,
  totalCount: 10, // static for testing
};

const videoSlice = createSlice({
  name: REDUCERS.videos,
  initialState,
  reducers: {
    fetchVideos: (state, action) => {
      state.isLoadingMore = true;
      state.error = '';
    },
    onFetchVideosSuccess: (state, action: PayloadAction<VideoType[]>) => {
      state.isLoading = false;
      state.isLoadingMore = false;
      state.videos = [...state.videos, ...action.payload];
    },
    onFetchVideosFailure: (state, action) => {
      state.isLoading = false;
      state.isLoadingMore = false;
      state.error = action.payload;
    },
    setStartIndex: (state, action: PayloadAction<number>) => {
      state.isLoadingMore = true;
      state.startIndex = action.payload; // Update startIndex
    },
  },
});

export const {
  fetchVideos,
  onFetchVideosFailure,
  onFetchVideosSuccess,
  setStartIndex,
} = videoSlice.actions;
export default videoSlice.reducer;

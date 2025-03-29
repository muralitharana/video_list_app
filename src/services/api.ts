import axios from 'axios';
import {Pagination, VideoType} from '../types/video';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3000/',
});

api.interceptors.response.use(
  response => response,
  error => {
    // Handle errors
    return Promise.reject(error);
  },
);

export const getVideos = async (
  pagination: Pagination,
): Promise<{
  data: VideoType[];
}> => {
  const {limit, startIndex} = pagination;
  console.log(startIndex, limit);
  const response = await api.get(`videos?_start=${startIndex}&_limit=${limit}`);
  return response.data; // Return the data directly
};

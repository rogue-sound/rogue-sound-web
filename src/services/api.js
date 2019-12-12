import http from './http';
import { azure } from '../config';

export const getCurrent = () => http.get(`${azure.apiUrl}/getCurrent`).then((res) => {
  console.log(res.data);
  return res.data;
});

export const addSong = (songRequestModel) => http
  .post(`${azure.apiUrl}/addSong`, songRequestModel)
  .then((res) => console.log(res.data));

export const clearQueue = () => http.get(`${azure.apiUrl}/clearQueue`);

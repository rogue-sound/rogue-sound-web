import { azure } from '@config';
import http from './http';

export const getCurrent = () =>
  http.get(`${azure.apiUrl}/getCurrent`).then(res => res.data);

export const addSong = songRequestModel =>
  http.post(`${azure.apiUrl}/addSong`, songRequestModel).then(res => res.data);

export const clearQueue = () => http.get(`${azure.apiUrl}/clearQueue`);

export const skipCurrentSong = () =>
  http.post(`${azure.apiUrl}/SkipCurrentSong`);

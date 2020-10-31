import { azure } from '@config';
import http from './http';

export const getCurrent = roomId =>
  http.get(`${azure.lobbyUrl}/${roomId}/getCurrent`).then(res => res.data);

export const addSong = (roomId, songRequestModel) =>
  http
    .post(`${azure.lobbyUrl}/${roomId}/addSong`, songRequestModel)
    .then(res => res.data);

export const clearQueue = roomId =>
  http.get(`${azure.lobbyUrl}/${roomId}/clearQueue`);

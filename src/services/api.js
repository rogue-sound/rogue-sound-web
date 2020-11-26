import { azure } from '@config';
import http from './http';

export const getCurrent = roomId =>
  http
    .get(`${azure.apiUrl}/getCurrent`, { params: { roomId } })
    .then(res => res.data);

export const addSong = songRequestModel =>
  http.post(`${azure.apiUrl}/addSong`, songRequestModel).then(res => res.data);

export const getRooms = ({ query, style = '' } = {}, skip = 0, take = 10) => {
  const partialUrl = style ? `/${style}` : style;
  const params = {
    ...(query && { name: query }),
    skip,
    take,
  };
  return http
    .get(`${azure.lobbyUrl}/rooms${partialUrl}`, { params })
    .then(res => res.data);
};

export const getRoomStyles = () =>
  http.get(`${azure.lobbyUrl}/rooms/styles`).then(res => res.data);

export const createRoom = ({ name, style }, { id, displayName, avatar }) => {
  const payload = {
    name,
    style,
    user: {
      id,
      displayName,
      ...(avatar && { avatar }),
    },
  };
  return http.post(`${azure.lobbyUrl}/rooms`, payload).then(res => res.data);
};

// export const getRoomDetails = id =>
//   Promise.resolve({ id, name: 'Room', creator: 'bonavida' });

export const getRoomDetails = id => http.get(`${azure.lobbyUrl}/rooms/${id}`).then(res => res.data);

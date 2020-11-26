import { azure } from '@config';
import http from './http';

export const getCurrent = roomId =>
  http
    .get(`${azure.apiUrl}/getCurrent`, { params: { roomId } })
    .then(res => res.data);

export const addSong = songRequestModel =>
  http.post(`${azure.apiUrl}/addSong`, songRequestModel).then(res => res.data);

export const getRooms = ({ query, style } = {}, skip = 0, take = 10) => {
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

export const getRoomStyles = () => http.get(`${azure.lobbyUrl}/rooms/styles`);

// export const createRoom = (room, { username, displayName }) => {
//   const payload = {
//     room,
//     username,
//     displayName,
//   };
//   return http.post(`${azure.lobbyUrl}/createRoom`, payload).then(res => res.data);
// }

// TODO: Uncomment above code and delete promise
export const createRoom = room => Promise.resolve(room);

export const getRoomDetails = id =>
  Promise.resolve({ id, name: 'Room', creator: 'bonavida' });

// export const getRoomDetails = id => http.get(`${azure.lobbyUrl}/room/${id}`);

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
    ...(query && { query }),
    skip,
    take,
  };
  // return http.get(`${azure.apiUrl}/rooms${partialUrl}`, { params }).then(res => res.data);
  // TODO: Remove fake id
  const d = Date.now();
  return Promise.resolve([
    {
      id: `${d}_1`,
      name: 'Chill the fuck up',
      creator: 'bonavida',
      style: 'chill',
      image: 'https://roguesounddata.blob.core.windows.net/rooms/room1.jpg',
    },
    {
      id: `${d}_2`,
      name: 'Rogue Friday',
      creator: 'jmolla31',
      style: 'random',
      image: 'https://roguesounddata.blob.core.windows.net/rooms/room2.jpg',
    },
    {
      id: `${d}_3`,
      name: 'a e s t h e t i c',
      creator: 'joanguillen',
      style: 'party',
      image: 'https://roguesounddata.blob.core.windows.net/styles/style2.jpg',
    },
    {
      id: `${d}_4`,
      name: 'Yo solo quiero un jueves tranquilo',
      creator: 'MateoBeMo',
      style: 'chill',
      image: 'https://roguesounddata.blob.core.windows.net/rooms/room4.jpg',
    },
    {
      id: `${d}_5`,
      name: 'Això ho pague jo (la llum)',
      creator: 'proteiN_as',
      style: 'random',
      image: 'https://roguesounddata.blob.core.windows.net/rooms/room5.jpg',
    },
    {
      id: `${d}_6`,
      name: 'Monos everywhere',
      creator: 'ApoloeXp',
      style: 'chill',
      image: 'https://roguesounddata.blob.core.windows.net/rooms/room6.jpg',
    },
    {
      id: `${d}_7`,
      name: 'Muchachada Nui',
      creator: 'gaussnit',
      style: 'random',
      image: 'https://roguesounddata.blob.core.windows.net/rooms/room7.jpg',
    },
    {
      id: `${d}_8`,
      name: 'Random room #1',
      creator: 'bonavida',
      style: 'chill',
      image: 'https://roguesounddata.blob.core.windows.net/rooms/room8.jpg',
    },
    {
      id: `${d}_9`,
      name: 'Random room #2',
      creator: 'jmolla31',
      style: 'chill',
      image: 'https://roguesounddata.blob.core.windows.net/rooms/room9.jpg',
    },
    {
      id: `${d}_10`,
      name: 'Random room #3',
      creator: 'joanguillen',
      style: 'random',
      image: 'https://roguesounddata.blob.core.windows.net/styles/style1.jpg',
    },
  ]);
};

export const getRoomStyles = () => http.get(`${azure.apiUrl}/rooms/styles`);

// export const createRoom = (room, { username, displayName }) => {
//   const payload = {
//     room,
//     username,
//     displayName,
//   };
//   return http.post(`${azure.apiUrl}/createRoom`, payload).then(res => res.data);
// }

// TODO: Uncomment above code and delete promise
export const createRoom = room => Promise.resolve(room);

export const getRoomDetails = id =>
  Promise.resolve({ id, name: 'Room', creator: 'bonavida' });

// export const getRoomDetails = id => http.get(`${azure.apiUrl}/room/${id}`);

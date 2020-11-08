import { azure } from '@config';
import http from './http';

export const getCurrent = () =>
  http.get(`${azure.apiUrl}/getCurrent`).then(res => res.data);

export const addSong = songRequestModel =>
  http.post(`${azure.apiUrl}/addSong`, songRequestModel).then(res => res.data);

export const clearQueue = () => http.get(`${azure.apiUrl}/clearQueue`);

export const getRooms = (style = '', skip = 0, take = 10) => {
  const partialUrl = style ? `/${style}` : style;
  const params = {
    skip,
    take,
  };
  // return http.get(`${azure.apiUrl}/rooms${partialUrl}`, { params }).then(res => res.data);
  return Promise.resolve([
    { id: 1, name: 'Chill the fuck up', creator: 'bonavida', style: 'chill' },
    { id: 2, name: 'Rogue Friday', creator: 'jmolla31', style: 'random' },
    {
      id: 3,
      name: 'a e s t h e t i c',
      creator: 'joanguillen',
      style: 'party',
    },
    {
      id: 4,
      name: 'Yo solo quiero un jueves tranquilo',
      creator: 'MateoBeMo',
      style: 'chill',
    },
    {
      id: 5,
      name: 'Això ho pague jo (la llum)',
      creator: 'proteiN_as',
      style: 'random',
    },
    { id: 6, name: 'Monos everywhere', creator: 'ApoloeXp', style: 'chill' },
  ]);
};

export const getRoomStyles = () => http.get(`${azure.apiUrl}/rooms/styles`);

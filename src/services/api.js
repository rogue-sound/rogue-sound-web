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
  // TODO: Remove fake id
  const d = Date.now();
  return Promise.resolve([
    {
      id: `${d}_1`,
      name: 'Chill the fuck up',
      creator: 'bonavida',
      style: 'chill',
    },
    {
      id: `${d}_2`,
      name: 'Rogue Friday',
      creator: 'jmolla31',
      style: 'random',
    },
    {
      id: `${d}_3`,
      name: 'a e s t h e t i c',
      creator: 'joanguillen',
      style: 'party',
    },
    {
      id: `${d}_4`,
      name: 'Yo solo quiero un jueves tranquilo',
      creator: 'MateoBeMo',
      style: 'chill',
    },
    {
      id: `${d}_5`,
      name: 'Això ho pague jo (la llum)',
      creator: 'proteiN_as',
      style: 'random',
    },
    {
      id: `${d}_6`,
      name: 'Monos everywhere',
      creator: 'ApoloeXp',
      style: 'chill',
    },
    {
      id: `${d}_7`,
      name: 'Random room #1',
      creator: 'bonavida',
      style: 'chill',
    },
    {
      id: `${d}_8`,
      name: 'Random room #2',
      creator: 'jmolla31',
      style: 'chill',
    },
    {
      id: `${d}_9`,
      name: 'Random room #3',
      creator: 'joanguillen',
      style: 'chill',
    },
    {
      id: `${d}_10`,
      name: 'Random room #4',
      creator: 'MateoBemo',
      style: 'chill',
    },
  ]);
};

export const getRoomStyles = () => http.get(`${azure.apiUrl}/rooms/styles`);

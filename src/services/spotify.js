import { noop } from '@utils/utils';
import { SongSearchConstants } from '@utils/constants';
import http from './http';
import { spotify } from '@config';

const endpointUrlMe = `${spotify.apiUrl}/me`;
const endpointUrlPlayer = `${endpointUrlMe}/player`;
const endpointUrlDevices = `${endpointUrlPlayer}/devices`;
const endpointUrlPlay = `${endpointUrlPlayer}/play`;
const endpointUrlRepeat = `${endpointUrlPlayer}/repeat`;
const endpointUrlGetTrack = `${spotify.apiUrl}/tracks`;
const endpointUrlSearch = `${spotify.apiUrl}/search`;

export const getMe = () => http.get(endpointUrlMe).then(res => res.data);

export const getDevices = () =>
  http.get(endpointUrlDevices).then(res => res.data.devices);

export const changeDevice = (deviceId, play) => {
  const payload = {
    device_ids: [deviceId],
    play,
  };
  return http.put(endpointUrlPlayer, payload);
};

export const playSong = (song, deviceId) =>
  http.put(`${endpointUrlPlay}?device_id=${deviceId}`, song);

export const getTrack = id =>
  http.get(`${endpointUrlGetTrack}/${id}`).then(res => res.data);

export const disableRepeat = deviceId =>
  http
    .put(`${endpointUrlRepeat}?state=off&deviceId=${deviceId}`)
    .then(console.log('Disabled auto repeat for the user'))
    .catch(noop);

export const search = (query, offset) => {
  const params = {
    q: query,
    type: 'track',
    offset,
    limit: SongSearchConstants.SEARCH_LIMIT,
  };
  return http
    .get(endpointUrlSearch, { params })
    .then(res => res.data.tracks.items);
};

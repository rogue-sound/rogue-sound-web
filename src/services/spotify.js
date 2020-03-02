import { noop } from '@utils/utils';
import {
  SongSearchConstants,
  TopTracksTimeRangeConstants,
} from '@utils/constants';
import http from './http';
import { spotify } from '@config';

const endpointUrlMe = `${spotify.apiUrl}/me`;
const endpointUrlPlayer = `${endpointUrlMe}/player`;
const endpointUrlTopTracks = `${endpointUrlMe}/top/tracks`;
const endpointUrlDevices = `${endpointUrlPlayer}/devices`;
const endpointUrlPlay = `${endpointUrlPlayer}/play`;
const endpointUrlRepeat = `${endpointUrlPlayer}/repeat`;
const endpointUrlGetTrack = `${spotify.apiUrl}/tracks`;
const endpointUrlSearch = `${spotify.apiUrl}/search`;

export const getMe = () => http.get(endpointUrlMe).then(res => res.data);

export const getDevices = () =>
  http.get(endpointUrlDevices).then(res => res.data.devices);

export const changeDevice = (deviceId, playAfterChange = true) => {
  const payload = {
    device_ids: [deviceId],
    play: playAfterChange,
  };
  return http.put(endpointUrlPlayer, payload);
};

export const playSong = song => http.put(endpointUrlPlay, song);
// .then(res => console.log(res));

export const getTrack = id =>
  http.get(`${endpointUrlGetTrack}/${id}`).then(res => res.data);

export const disableRepeat = () =>
  http
    .put(`${endpointUrlRepeat}?state=off`)
    .then(console.log('Disabled auto repeat for the user'))
    .catch(noop);

// TODO: Might be improved for more filters
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

export const getTopTracks = (
  offset,
  time_range = TopTracksTimeRangeConstants.MEDIUM_TERM
) => {
  const params = {
    offset,
    limit: SongSearchConstants.SEARCH_LIMIT,
    time_range,
  };
  return http.get(endpointUrlTopTracks, { params }).then(res => res.data.items);
};

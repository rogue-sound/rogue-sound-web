export const noop = () => {};

export const getSpotifyId = song => {
  return song.replace(/.*:/, '');
};

export const textDuration = duration => {
  const minutes = Math.floor(duration / 60000);
  const seconds = ((duration % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const translate = (intl, id) =>
  intl.formatMessage({
    id,
  });

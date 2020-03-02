export const noop = () => {};

export const getSpotifyId = song => {
  return song.replace(/.*:/, '');
};

export const textDuration = duration => {
  const minutes = Math.floor(duration / 60000);
  const seconds = ((duration % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const githubSPA = () => {
  const l = window.location;
  if (l.search) {
    const q = {};
    l.search
      .slice(1)
      .split('&')
      .forEach(v => {
        const a = v.split('=');
        q[a[0]] = a
          .slice(1)
          .join('=')
          .replace(/~and~/g, '&');
      });
    if (q.p !== undefined) {
      window.history.replaceState(
        null,
        null,
        l.pathname.slice(0, -1) + (q.p || '') + (q.q ? `?${q.q}` : '') + l.hash
      );
    }
  }
};

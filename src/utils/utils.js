import history from './history';

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

export const getNestedObject = (nestedObj, pathArr) => {
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined),
    nestedObj
  );
};

export const retrieveSpotifyToken = () => {
  const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      if (item) {
        const parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});

  const _token = hash.access_token;

  window.location.hash = '';
  // Clear the hash leftover
  window.history.pushState(
    '',
    document.title,
    window.location.pathname + window.location.search
  );

  return _token;
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

export const saveRedirectPath = () => {
  sessionStorage.setItem('redirect_url', window.location.pathname);
};

export const redirectFromSessionStorage = () => {
  const redirectUrl = sessionStorage.getItem('redirect_url');
  const pathname = redirectUrl
    ? redirectUrl === '/'
      ? '/rooms'
      : redirectUrl
    : '/';

  history.replace({
    pathname,
  });
};

import { spotify } from '@config';

const buildSpotifyAuthUrl = (clientId, redirectUri, loginUrl, scopes) => `
${loginUrl}
?response_type=token
&client_id=${encodeURIComponent(clientId)}
&scope=${encodeURIComponent(scopes.join(' '))}
&redirect_uri=${encodeURIComponent(redirectUri)}
`;

export const login = () => {
  const { clientId, redirectUri, loginUrl, scopes } = spotify.auth;
  if (clientId && redirectUri) {
    const authUrl = buildSpotifyAuthUrl(
      clientId,
      redirectUri,
      loginUrl,
      scopes
    );
    console.log(authUrl);
    window.location = authUrl;
  }
};

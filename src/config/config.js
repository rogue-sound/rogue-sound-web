const spotify = {
  apiUrl: 'https://api.spotify.com/v1',
  auth: {
    loginUrl: 'https://accounts.spotify.com/authorize',
    clientId: process.env.CLIENT_ID || '',
    redirectUri: process.env.REDIRECT_URI || '',
    scopes: [
      'user-read-currently-playing',
      'user-read-playback-state',
      'user-modify-playback-state',
    ],
  },
};
const azure = {
  apiUrl: 'https://rogue-sound-poc-functions.azurewebsites.net/api',
};

export { spotify, azure };

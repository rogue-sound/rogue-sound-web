import { defineMessages } from 'react-intl';

export default defineMessages({
  NowPlayingSubmitterText: {
    id: 'app.pages.Room.Play.NowPlayingSubmitterText',
    defaultMessage: 'is now playing',
  },
  SessionNotStartedText: {
    id: 'app.pages.Room.Play.SessionNotStartedText',
    defaultMessage: 'Session not started, please queue a song',
  },
  NoAvailableDevicesText: {
    id: 'app.pages.Room.Play.NoAvailableDevicesText',
    defaultMessage:
      'There are no available spotify devices connected to this account',
  },
  NoActiveDeviceText: {
    id: 'app.pages.Room.Play.NoActiveDeviceText',
    defaultMessage: 'There is no active device selected, please choose one',
  },
});

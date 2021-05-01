import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setQueue, playSongAction } from '@context/playing';
import { getCurrent } from '@services/api';
import { disableRepeat } from '@services/spotify';
import CurrentSong from './CurrentSong';
import useDumbPolling from './Hooks/useDumbPolling';
import useSmartPolling from './Hooks/useSmartPolling';

import './Play.scss';

const Play = ({ room: { id: roomId, style: roomStyle } }) => {
  const intl = useIntl();

  const reduxCurrent = useSelector(state => state.playing.current);
  const playingDevice = useSelector(state => state.playing.device);
  const devices = useSelector(state => state.spotify.devices);
  const activeDevice = useSelector(state => state.spotify.activeDevice);
  const dispatch = useDispatch();

  /* Polling */
  const [setDumbPolling] = useDumbPolling();
  const [remaining, setRemaining, setSmartPolling] = useSmartPolling();

  const _playSong = useCallback(
    async (song, device) => {
      if (song?.endTime !== reduxCurrent?.endTime || playingDevice !== device)
        dispatch(playSongAction(song, device, reduxCurrent));
    },
    [dispatch, reduxCurrent, playingDevice]
  );

  /* Get room information (current song and queue) */
  const getRoomInformation = useCallback(async () => {
    if (!roomId || !roomStyle) return;
    const { current, songs } = await getCurrent(`${roomId}${roomStyle}`);
    if (songs) dispatch(setQueue(songs));
    if (activeDevice) _playSong(current, activeDevice);
  }, [roomId, roomStyle, _playSong, dispatch, activeDevice]);

  /* Join the room as soon there is an available device and reload on change */
  useEffect(() => {
    activeDevice && getRoomInformation();
  }, [roomId, roomStyle, activeDevice]);

  /* Disable repeat in the playing device */
  useEffect(() => {
    playingDevice && disableRepeat(playingDevice);
  }, [playingDevice]);

  /* Control smart polling */
  useEffect(() => {
    if (!reduxCurrent?.songId) setRemaining(null);
    if (reduxCurrent?.duration) {
      const { duration, position } = reduxCurrent;
      const remainingTime = duration - position;
      setRemaining(remainingTime);
    }
  }, [reduxCurrent]);

  /* Set polling callbacks */
  useEffect(() => {
    setDumbPolling(getRoomInformation);
    setSmartPolling(getRoomInformation);
  }, [getRoomInformation]);

  const notificationMessage = id => (
    <p className="notification-message">
      {intl.formatMessage({ id: `app.pages.Room.Play.${id}` })}
    </p>
  );

  const renderPlay = () => {
    if (!devices.length) return notificationMessage('NoAvailableDevicesText');
    if (!activeDevice) return notificationMessage('NoActiveDeviceText');
    if (!remaining) return notificationMessage('SessionNotStartedText');

    return <CurrentSong {...reduxCurrent} />;
  };

  return (
    <>
      {!!remaining && (
        <div className="current-song-submitter">
          <FontAwesomeIcon icon="headphones" />
          {`${reduxCurrent.user} ${intl.formatMessage({
            id: 'app.pages.Room.Play.NowPlayingSubmitterText',
          })}...`}
        </div>
      )}
      <div className="play-module">{renderPlay()}</div>
    </>
  );
};

Play.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    creator: PropTypes.string,
    style: PropTypes.number,
  }),
};

export default Play;

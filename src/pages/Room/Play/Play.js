import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setCurrent, setQueue, setPlayingDevice, stop } from '@context/playing';
import { playSong, disableRepeat } from '@services/spotify';
import { getCurrent } from '@services/api';
import CurrentSong from './CurrentSong';
import useDumbPolling from './Hooks/useDumbPolling';
import useSmartPolling from './Hooks/useSmartPolling';

import './Play.scss';

const Play = ({ room: { id: roomId, style: roomStyle } }) => {
  const intl = useIntl();
  const disabledRepeat = useRef(false);

  const reduxCurrent = useSelector(state => state.playing.current);
  const playingDevice = useSelector(state => state.playing.device);
  const devices = useSelector(state => state.spotify.devices);
  const activeDevice = useSelector(state => state.spotify.activeDevice);

  const dispatch = useDispatch();

  /* Polling */
  const [setDumbPolling] = useDumbPolling();
  const [remaining, setRemaining, setSmartPolling] = useSmartPolling();

  /* Play song */
  const _playSong = useCallback(
    async (song, selectedDevice) => {
      try {
        if (song === null) throw new Error('Queue has ended');
        if (
          song.songId === reduxCurrent?.songId &&
          playingDevice === selectedDevice
        )
          return;
        const _song = {
          uris: [song.songId],
          position_ms: song.position,
        };
        await playSong(_song, selectedDevice);
        if (!disabledRepeat.current) {
          disableRepeat(selectedDevice);
          disabledRepeat.current = true;
        }
        dispatch(setPlayingDevice(selectedDevice));
        dispatch(setCurrent(song));
      } catch {
        if (reduxCurrent?.songId) {
          dispatch(stop());
          setRemaining(null);
        }
      }
    },
    [dispatch, reduxCurrent]
  );

  /* Get room information (current song and queue) */
  const getRoomInformation = useCallback(async () => {
    if (!roomId || !roomStyle) return [];
    const { current, songs } = await getCurrent(`${roomId}${roomStyle}`);
    if (songs) dispatch(setQueue(songs));
    if (activeDevice) _playSong(current, activeDevice);
    return [current, songs];
  }, [roomId, roomStyle, _playSong, dispatch, activeDevice]);

  /* Join the room as soon the it is loaded and reload on device change */
  useEffect(() => {
    if (activeDevice) {
      getRoomInformation();
    }
  }, [roomId, roomStyle, activeDevice]);

  /* Set up smart polling */
  useEffect(() => {
    if (!reduxCurrent) setRemaining(null);
    if (reduxCurrent?.duration) {
      const { duration, position } = reduxCurrent;
      const remainingTime = duration - position;
      setRemaining(remainingTime);
    }
  }, [reduxCurrent]);

  /* Set pollings */
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

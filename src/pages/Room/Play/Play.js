import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setCurrent, setQueue, stop } from '@context/playing';
import { playSong, disableRepeat } from '@services/spotify';
import { getCurrent } from '@services/api';
import { DUMB_POLLING_RATE } from '@utils/constants';
import CurrentSong from './CurrentSong';

import './Play.scss';

const Play = ({ room: { id: roomId, style: roomStyle } }) => {
  const intl = useIntl();
  const [remaining, setRemaining] = useState(null);
  const [pollingState, setPollingState] = useState(false);
  const smartPolling = useRef(null);
  const dumbPolling = useRef(null);
  const disabledRepeat = useRef(false);

  const reduxCurrent = useSelector(state => state.playing.current);
  const devices = useSelector(state => state.spotify.devices);
  const activeDevice = useSelector(state => state.spotify.activeDevice);

  const dispatch = useDispatch();

  /* Play song */
  const _playSong = useCallback(
    async (song, device, forcePlay) => {
      try {
        if (song === null) throw new Error('Queue has ended');
        if (!forcePlay && song.songId === reduxCurrent?.songId) return;
        const _song = {
          uris: [song.songId],
          position_ms: song.position,
        };
        await playSong(_song, device);
        if (!disabledRepeat.current) {
          disableRepeat(device);
          disabledRepeat.current = true;
        }
        dispatch(setCurrent(song));
      } catch {
        dispatch(stop());
        setRemaining(null);
      }
    },
    [dispatch, reduxCurrent]
  );

  /* Get room information (current song and queue) */
  const getRoomInformation = useCallback(
    async (forcePlay = false) => {
      if (!roomId || !roomStyle) return [];
      const { current, songs } = await getCurrent(`${roomId}${roomStyle}`);
      if (songs) dispatch(setQueue(songs));
      if (activeDevice) _playSong(current, activeDevice, forcePlay);
      return [current, songs];
    },
    [roomId, roomStyle, _playSong, dispatch, activeDevice]
  );

  /* Join the room as soon the room is loaded and reload on device change */
  useEffect(() => {
    if (activeDevice) {
      getRoomInformation(true);
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

  /* Handle smart polling */
  useEffect(() => {
    if (smartPolling.current) clearTimeout(smartPolling.current);
    if (remaining) {
      smartPolling.current = setTimeout(() => {
        getRoomInformation();
      }, remaining);
    }
  }, [remaining, getRoomInformation]);

  /* Dumb polling */
  useEffect(() => {
    if (dumbPolling.current) clearTimeout(dumbPolling.current);
    dumbPolling.current = setTimeout(() => {
      getRoomInformation();
      setPollingState(prev => !prev);
    }, DUMB_POLLING_RATE);
  }, [pollingState, getRoomInformation]);

  /* Clean-up */
  useEffect(() => {
    return () => {
      console.log('[UNMOUNT] Clearing pollings');
      smartPolling.current && clearTimeout(smartPolling.current);
      dumbPolling.current && clearTimeout(dumbPolling.current);
    };
  }, []);

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

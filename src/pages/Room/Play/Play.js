import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setCurrent, setQueue, stop } from '@context/playing';
import { playSong, disableRepeat } from '@services/spotify';
import { getCurrent } from '@services/api';
import CurrentSong from './CurrentSong';

import './Play.scss';

const Play = ({ room: { id: roomId, style: roomStyle } }) => {
  const intl = useIntl();
  const [remaining, setRemaining] = useState(null);
  const [playTimeout, setPlayTimeout] = useState(null);
  const [pollingState, setPollingState] = useState(false);
  const dumbPolling = useRef(null);
  const disabledRepeat = useRef(false);

  const reduxCurrent = useSelector(state => state.playing.current);
  const { devices, activeDevice } = useSelector(state => state.spotify);

  const dispatch = useDispatch();

  /* Play song */
  const _playSong = useCallback(
    async (song, device) => {
      // Review this condition to setCurrent on end
      if (!device || song.songId === reduxCurrent.songId) return;
      try {
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
    async (updateCurrent = true, updateQueue = true) => {
      if (!roomId || !roomStyle) return [];
      const { current, songs } = await getCurrent(`${roomId}${roomStyle}`);
      if (updateQueue && songs) dispatch(setQueue(songs));
      if (updateCurrent && activeDevice) {
        _playSong(current, activeDevice);
      }
      return [current, songs];
    },
    [roomId, roomStyle, _playSong, dispatch, activeDevice]
  );

  /* TODO: Fix rejoin when new device is selected */
  // useEffect(() => {
  //   console.log(`activeDevice`, activeDevice);
  //   getRoomInformation();
  // }, [activeDevice]);

  /* TODO: Join session before first dumb polling exeuction */

  /* Set up smart polling */
  useEffect(() => {
    if (!reduxCurrent) setRemaining(null);
    console.log('Setting up smart polling');
    const { duration, position } = reduxCurrent;
    const remainingTime = duration - position;
    setRemaining(remainingTime);
  }, [reduxCurrent]);

  /* Handle smart polling */
  useEffect(() => {
    playTimeout && clearTimeout(playTimeout);
    if (remaining) {
      setPlayTimeout(
        setTimeout(() => {
          getRoomInformation();
        }, remaining)
      );
    }

    return () => {
      console.log('[UNMOUNT] Clearing smart polling');
      clearTimeout(playTimeout);
    };
  }, [remaining, getRoomInformation]);

  /* Dumb polling */
  useEffect(() => {
    const { current: currentPolling } = dumbPolling;
    if (currentPolling) clearTimeout(currentPolling);
    dumbPolling.current = setTimeout(() => {
      getRoomInformation();
      setPollingState(prev => !prev);
    }, 4000);

    return () => {
      console.log('[UNMOUNT] Clearing dumb polling');
      clearTimeout(currentPolling);
    };
  }, [pollingState, getRoomInformation]);

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

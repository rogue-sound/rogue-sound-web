import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { clearToken } from '@context/auth';
import { setCurrent, setQueue, stop } from '@context/playing';
import { playSong } from '@services/spotify';
import { getCurrent } from '@services/api';
// setQueue, clearQueue, disableRepeat
import CurrentSong from './CurrentSong';

import './Play.scss';

const Play = () => {
  const intl = useIntl();
  const [remaining, setRemaining] = useState(null);
  const remainingRef = useRef(remaining);
  remainingRef.current = remaining;
  const [joinTimeout, setJoinTimeout] = useState(null);
  const [pollingState, setPollingState] = useState(false);

  const reduxCurrent = useSelector(state => state.playing.current);
  const { devices, activeDevice } = useSelector(state => state.spotify);

  const dispatch = useDispatch();

  const handleJoin = async (smart = false) => {
    try {
      const { current, songs } = await getCurrent();
      if (smart || (!remainingRef.current && current)) {
        const song = {
          uris: [current.songId],
          position_ms: current.position,
        };
        // TODO: Add queue handling
        try {
          await playSong(song);
          dispatch(setCurrent(current));
          const remainingTime = current.duration - current.position;
          setRemaining(remainingTime);
        } catch (err) {
          const {
            response: { status },
          } = err;
          // Token expired
          status === 401 && dispatch(clearToken());
          dispatch(stop());
        }
      }
      songs && dispatch(setQueue(songs));
    } catch {
      dispatch(stop());
      setRemaining(null);
      setJoinTimeout(null);
    }
  };

  useEffect(() => {
    handleJoin();
  }, []);

  useEffect(() => {
    if (activeDevice) {
      handleJoin(true);
    }
  }, [activeDevice]);

  // Dumb polling
  useEffect(() => {
    const timeout = setTimeout(() => {
      handleJoin();
      setPollingState(!pollingState);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [pollingState]);

  // Smart polling
  useEffect(() => {
    if (remaining) {
      joinTimeout && clearTimeout(joinTimeout);
      setJoinTimeout(setTimeout(() => handleJoin(true), remaining));
    }
    return () => clearTimeout(joinTimeout);
  }, [remaining]);

  const renderPlay = () => {
    if (!devices.length)
      return (
        <p className="no-available-devices">
          {intl.formatMessage({
            id: 'app.pages.Home.Play.NoAvailableDevicesText',
          })}
        </p>
      );

    if (!activeDevice)
      return (
        <p className="no-available-devices">
          {intl.formatMessage({
            id: 'app.pages.Home.Play.NoActiveDeviceText',
          })}
        </p>
      );

    if (!remaining) {
      return (
        <p className="no-current-song">
          {intl.formatMessage({
            id: 'app.pages.Home.Play.SessionNotStartedText',
          })}
        </p>
      );
    }

    return <CurrentSong {...reduxCurrent} />;
  };

  // TODO: Add admin buttons?
  return (
    <>
      {!!remaining && (
        <div className="current-song-submitter">
          <FontAwesomeIcon icon="headphones" />
          {`${reduxCurrent.user} ${intl.formatMessage({
            id: 'app.pages.Home.Play.NowPlayingSubmitterText',
          })}...`}
        </div>
      )}
      <div className="play-module">{renderPlay()}</div>
    </>
  );
};

Play.propTypes = {};

export default Play;

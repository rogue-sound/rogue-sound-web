import React, { useState, useEffect, useRef } from 'react';
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
  const remainingRef = useRef(remaining);
  remainingRef.current = remaining;
  const [joinTimeout, setJoinTimeout] = useState(null);
  const [pollingState, setPollingState] = useState(false);
  const [disabledRepeat, setDisabledRepeat] = useState(false);

  const reduxCurrent = useSelector(state => state.playing.current);
  const { devices, activeDevice } = useSelector(state => state.spotify);

  const dispatch = useDispatch();

  const handleJoin = async (smart = false) => {
    try {
      if (!roomId || !roomStyle) return;
      const { current, songs } = await getCurrent(`${roomId}${roomStyle}`);
      if (smart || (!remainingRef.current && current)) {
        const song = {
          uris: [current.songId],
          position_ms: current.position,
        };
        if (activeDevice) {
          await playSong(song, activeDevice);
          if (!disabledRepeat) {
            disableRepeat(activeDevice);
            setDisabledRepeat(true);
          }
          dispatch(setCurrent(current));
          const remainingTime = current.duration - current.position;
          setRemaining(remainingTime);
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
    if (activeDevice) {
      handleJoin(true);
    } else {
      handleJoin();
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
            id: 'app.pages.Room.Play.NoAvailableDevicesText',
          })}
        </p>
      );

    if (!activeDevice)
      return (
        <p className="no-available-devices">
          {intl.formatMessage({
            id: 'app.pages.Room.Play.NoActiveDeviceText',
          })}
        </p>
      );

    if (!remaining) {
      return (
        <p className="no-current-song">
          {intl.formatMessage({
            id: 'app.pages.Room.Play.SessionNotStartedText',
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

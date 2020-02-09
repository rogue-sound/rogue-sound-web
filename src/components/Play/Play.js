import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { clearToken } from '@context/auth';
import { setCurrent, setQueue, stop } from '@context/playing';
import { playSong } from '@services/spotify';
import { getCurrent } from '@services/api';
// setQueue, clearQueue, disableRepeat
import CurrentSong from '@components/CurrentSong';

import { translate } from '@utils';

import './Play.scss';

const Play = ({ intl }) => {
  const [remaining, setRemaining] = useState(null);
  const remainingRef = useRef(remaining);
  remainingRef.current = remaining;
  const [joinTimeout, setJoinTimeout] = useState(null);
  const [pollingState, setPollingState] = useState(false);

  const {
    playing: { current: reduxCurrent },
    spotify: { devices },
  } = useSelector(state => state);

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
      // Smart polling
      setJoinTimeout(setTimeout(() => handleJoin(true), remaining));
    }
    return () => clearTimeout(joinTimeout);
  }, [remaining]);

  const playJSX = () => {
    if (devices.length) {
      if (remaining) {
        return <CurrentSong {...reduxCurrent} />;
      }
      return (
        <p className="no-current-song">
          {translate(intl, 'app.components.Play.SessionNotStartedText')}
        </p>
      );
    }
    return (
      <p className="no-available-devices">
        {translate(intl, 'app.components.Play.NoAvailableDevicesText')}
      </p>
    );
  };

  // TODO: Add admin buttons?
  return (
    <>
      {!!remaining && (
        <div className="current-song-submitter">
          <FontAwesomeIcon icon="headphones" />
          {`${reduxCurrent.user} ${translate(
            intl,
            'app.components.Play.NowPlayingSubmitterText'
          )}...`}
        </div>
      )}
      <div className="play-module">{playJSX()}</div>
    </>
  );
};

Play.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }).isRequired,
};

export default Play;

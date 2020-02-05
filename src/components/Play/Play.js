import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { clearToken } from '@context/auth';
import { setCurrent, setQueue, stop } from '@context/playing';
import { playSong } from '@services/spotify';
import { getCurrent } from '@services/api';
// setQueue, clearQueue, disableRepeat
import CurrentSong from '@components/CurrentSong';

import './Play.scss';

const Play = () => {
  const [remaining, setRemaining] = useState(null);
  const [joinTimeout, setJoinTimeout] = useState(null);
  const [pollingState, setPollingState] = useState(false);

  const reduxCurrent = useSelector(state => state.playing.current);

  const dispatch = useDispatch();

  const handleJoin = async (smart = false) => {
    try {
      const { current, songs } = await getCurrent();
      if (smart || (!remaining && current)) {
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
    const timeout = setTimeout(() => {
      handleJoin();
      setPollingState(!pollingState);
    }, 8000);
    return () => clearTimeout(timeout);
  }, [pollingState]);

  useEffect(() => {
    if (remaining) {
      joinTimeout && clearTimeout(joinTimeout);
      // Smart polling
      setJoinTimeout(setTimeout(() => handleJoin(true), remaining));
    }
  }, [remaining]);

  // TODO: Add admin buttons?
  return (
    <>
      {!!remaining && (
        <div className="current-song-submitter">
          <FontAwesomeIcon icon="headphones" />
          {reduxCurrent.user} is now playing...
        </div>
      )}
      <div className="play-module">
        {/* TODO: Improve */}
        {remaining ? (
          <CurrentSong {...reduxCurrent} />
        ) : (
          <p className="no-current-song">
            Session not started, please queue a song
          </p>
        )}
      </div>
    </>
  );
};

export default Play;

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { clearToken } from '@context/auth';
import { setCurrent, stop } from '@context/playing';
import { playSong } from '@services/spotify';
// import { getCurrent, clearQueue } from '@services/api';
// setQueue, disableRepeat

import './Play.scss';

const mockedCurrent = {
  songId: 'spotify:track:6Lg217oTYzLCTHoZRRAOtj',
  timerPosition: 0,
  duration: 10135,
  albumName: 'Ocarina of time',
  albumImg: 'https://i.scdn.co/image/ab67616d0000b273e98e53662a11cb453c14ab9c',
  title: "Zelda's Lullaby",
  artist: 'Zelda Cover Band',
  user: 'ApoloeXp',
};

const Play = () => {
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState(null);
  const [joinTimeout, setJoinTimeout] = useState(null);

  const dispatch = useDispatch();

  const handleJoin = async () => {
    try {
      // TODO: Disabled for now
      // const current = await getCurrent();
      const current = mockedCurrent;
      const song = {
        uris: [current.songId],
        position_ms: current.timerPosition,
      };
      // TODO: Add queue handling
      try {
        await playSong(song);
        dispatch(setCurrent(current));
        const remainingTime = current.duration - current.timerPosition;
        setRemaining(remainingTime);
      } catch (err) {
        const {
          response: { status },
        } = err;
        // Token expired
        status === 401 && dispatch(clearToken());
        dispatch(stop());
      }
    } catch {
      dispatch(stop());
      setRemaining(null);
      setJoinTimeout(null);
    }
  };

  const joinRoom = async () => {
    setLoading(true);
    await handleJoin();
    setLoading(false);
  };

  useEffect(() => {
    if (remaining) {
      joinTimeout && clearTimeout(joinTimeout);
      // Smart polling
      setJoinTimeout(setTimeout(() => handleJoin(), remaining + 1000));
    }
  }, [remaining]);

  // TODO: Add admin buttons?
  return (
    <div className="play-module">
      {/* TODO: Improve */}
      {remaining ? (
        <div>HELLO</div>
      ) : (
        <FontAwesomeIcon icon="play" className="join-icon" onClick={joinRoom} />
      )}
      {loading && 'Loading'}
    </div>
  );
};

export default Play;

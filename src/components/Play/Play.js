import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { clearToken } from '@context/auth';
import { setCurrent, stop } from '@context/playing';
import { playSong, disableRepeat } from '@services/spotify';
import { getCurrent } from '@services/api';
// setQueue, clearQueue, disableRepeat
import CurrentSong from '@components/CurrentSong';

import './Play.scss';

// const mockedCurrent = {
//   songId: 'spotify:track:6Lg217oTYzLCTHoZRRAOtj',
//   position: 0,
//   duration: 10135,
//   albumName: 'Ocarina of time',
//   albumImg: 'https://i.scdn.co/image/ab67616d0000b273e98e53662a11cb453c14ab9c',
//   title: "Zelda's Lullaby",
//   artist: 'Zelda Cover Band',
//   user: 'ApoloeXp',
// };

// const mockedCurrent = {
//   songId: 'spotify:track:4RzcujeUhpatTXGnRwQ6qA',
//   position: 0,
//   duration: 483525,
//   albumName: 'Resurection Legacy',
//   albumImg: 'https://i.scdn.co/image/ab67616d00001e02a0f6f1d8de55df7830cb054e',
//   title: 'Resurection (Space Club Mix)',
//   artist: 'PPK',
//   user: 'ApoloeXp',
// };

const Play = () => {
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState(null);
  const [joinTimeout, setJoinTimeout] = useState(null);

  const reduxCurrent = useSelector(state => state.playing.current);

  const dispatch = useDispatch();

  const handleJoin = async () => {
    try {
      // TODO: Disabled for now
      const [current] = await getCurrent();
      // const current = mockedCurrent;
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
    } catch {
      dispatch(stop());
      setRemaining(null);
      setJoinTimeout(null);
    }
  };

  const joinRoom = async () => {
    setLoading(true);
    await handleJoin();
    disableRepeat();
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
    <>
      {remaining && (
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
          <FontAwesomeIcon
            icon="play"
            className="play-module__join-icon"
            onClick={joinRoom}
          />
        )}
        {/* TODO: Add visual loading */}
        {loading && 'Loading'}
      </div>
    </>
  );
};

export default Play;

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from '@common/Input';
import { addSong } from '@services/api';
import { search } from '@services/spotify';

import SongResult from './SongResult';

import './SearchSongs.scss';

const SearchSongs = () => {
  const [song, setSong] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const searchSongs = async query => {
    const result = await search(query);
    setSearchResults(result);
  };

  const handleChangeSong = event => {
    const songValue = event.currentTarget.value;
    setSong(songValue);
    if (!songValue.length) setSearchResults([]);
  };

  const handleSongSelect = async selectedSong => {
    try {
      await addSong(selectedSong);
      console.log('Song added to the list');
      // !remaining && setTimeout(() => handleJoin(), 1000);
    } catch {
      console.log('There was a problem adding the song to the list');
    }
    setSearchResults([]);
    setSong('');
  };

  useEffect(() => {
    if (song && song.length) {
      searchTimeout && clearTimeout(searchTimeout);
      setSearchTimeout(setTimeout(() => searchSongs(song), 750));
    }
  }, [song]);

  return (
    <>
      <div className="song-search">
        <FontAwesomeIcon icon="search" />
        <Input
          value={song}
          // name="song-search"
          placeholder="Search for songs"
          onChange={handleChangeSong}
          // type="search"
        />
      </div>
      <div className={`song-search-results ${!song && 'hidden'}`}>
        {searchResults &&
          !!searchResults.length &&
          searchResults.map(songResult => (
            <SongResult
              song={songResult}
              key={songResult.id}
              onClickCallback={handleSongSelect}
            />
          ))}
      </div>
    </>
  );
};

export default SearchSongs;

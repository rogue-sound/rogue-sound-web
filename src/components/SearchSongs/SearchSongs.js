import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { setQueue } from '@context/playing';
import Input from '@common/Input';
import { addSong } from '@services/api';
import { search } from '@services/spotify';

import SongResult from './SongResult';

import './SearchSongs.scss';

const SearchSongs = ({ intl }) => {
  const [song, setSong] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  // TODO: Change with custom names
  const user = useSelector(state => state.me.displayName);
  const dispatch = useDispatch();

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
      selectedSong = {
        ...selectedSong,
        user,
      };
      const result = await addSong(selectedSong);
      console.log('Song added to the list');
      dispatch(setQueue(result.songs));
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
          placeholder={intl.formatMessage({
            id: 'app.components.SearchSongs.SearchForSongs',
          })}
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

SearchSongs.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }).isRequired,
};

export default SearchSongs;

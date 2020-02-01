import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './SearchSongs.scss';

const SearchSongs = () => {
  return (
    <div className="song-search">
      <FontAwesomeIcon icon="search" />
      Search for songs
    </div>
  );
};

export default SearchSongs;

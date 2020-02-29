import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useIntl } from 'react-intl';
import { setQueue } from '@context/playing';
import Input from '@common/Input';
import { addSong } from '@services/api';
import { search, topTracks } from '@services/spotify';
import { SongSearchConstants } from '@utils/constants';

import SongResult from './SongResult';

import './SearchSongs.scss';

const SearchSongs = () => {
  const intl = useIntl();
  const [expanded, setExpanded] = useState(false);
  const [offset, setOffset] = useState(0);
  const [song, setSong] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const user = useSelector(state => state.me.displayName);
  const dispatch = useDispatch();

  const searchSongs = async (query, newOffset = offset) => {
    const result = await search(query, newOffset);
    setExpanded(true);
    setSearchResults(result);
    setSearchTimeout(null);
  };

  const favouriteSongs = async (newOffset = offset) => {
    const result = await topTracks(newOffset);
    setExpanded(true);
    setSearchResults(result);
    setSearchTimeout(null);
  };

  const clearSearch = () => {
    setSong('');
    setSearchResults([]);
    clearTimeout(searchTimeout);
    setSearchTimeout(null);
    setExpanded(false);
    setOffset(0);
  };

  const handleChangeSong = event => {
    const songValue = event.currentTarget.value;
    setOffset(0);
    setSong(songValue);
    if (!songValue.length) {
      clearSearch();
    }
  };

  const handleSongSelect = async selectedSong => {
    try {
      const result = await addSong({ ...selectedSong, user });
      console.log('Song added to the list');
      dispatch(setQueue(result.songs));
    } catch {
      console.log('There was a problem adding the song to the list');
    }
    clearSearch();
  };

  const handleOffset = newOffset => {
    setOffset(newOffset);
    song ? searchSongs(song, newOffset) : favouriteSongs(newOffset);
  };

  useEffect(() => {
    !expanded && song && setExpanded(true);
    if (song) {
      searchTimeout && clearTimeout(searchTimeout);
      setSearchTimeout(
        setTimeout(() => {
          searchSongs(song);
        }, 750)
      );
    }
  }, [song]);

  const renderSearch = () => {
    if (searchTimeout) {
      return (
        <p className="song-search__searching">
          {intl.formatMessage({
            id: 'app.pages.Home.SearchSongs.Searching',
          })}
        </p>
      );
    }
    if (expanded && !searchResults.length)
      return (
        <p className="song-search__no-results">
          {intl.formatMessage({
            id: 'app.pages.Home.SearchSongs.SearchForSongsNoResultsText',
          })}
        </p>
      );
    return searchResults.map(songResult => (
      <SongResult
        song={songResult}
        key={songResult.id}
        onClickCallback={handleSongSelect}
      />
    ));
  };

  const renderFavouriteButton = () =>
    expanded ? (
      <FontAwesomeIcon
        icon="times"
        className="clear-search-results"
        onClick={() => clearSearch()}
      />
    ) : (
      <FontAwesomeIcon
        icon="heart"
        title={intl.formatMessage({
          id: 'app.pages.Home.SearchSongs.FavouriteSongsTooltip',
        })}
        className="get-favourite-songs"
        onClick={() => favouriteSongs()}
      />
    );

  const renderPagination = direction =>
    direction === 'prev'
      ? !!offset && (
          <FontAwesomeIcon
            icon="angle-left"
            onClick={() =>
              handleOffset(offset - SongSearchConstants.SEARCH_LIMIT)
            }
            className="pagination prev"
          />
        )
      : !searchTimeout &&
        searchResults.length === SongSearchConstants.SEARCH_LIMIT && (
          <FontAwesomeIcon
            icon="angle-right"
            onClick={() =>
              handleOffset(offset + SongSearchConstants.SEARCH_LIMIT)
            }
            className="pagination next"
          />
        );

  return (
    <>
      <div className="song-search">
        <FontAwesomeIcon icon="search" />
        <Input
          value={song}
          // name="song-search"
          placeholder={intl.formatMessage({
            id: 'app.pages.Home.SearchSongs.SearchForSongs',
          })}
          onChange={handleChangeSong}
          padding="0.375rem 0"
        />
        {renderFavouriteButton()}
      </div>
      <div className={`song-search-results ${!expanded && 'hidden'}`}>
        {renderPagination('prev')}
        {renderSearch()}
        {renderPagination('next')}
      </div>
    </>
  );
};

SearchSongs.propTypes = {};

export default SearchSongs;

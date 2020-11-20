import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
/** Actions */
import {
  setQueryFilter,
  setStyleFilter,
  clearRooms,
  fetchRooms,
} from '@context/rooms';
/** Components */
import SearchBox from '@components/SearchBox';
/** Styles */
import './RoomsFilter.scss';

const RoomsFilter = () => {
  const [style, setStyle] = useState('');
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleChangeQuery = newQuery => {
    setQuery(newQuery);
    dispatch(setQueryFilter(newQuery));
    dispatch(clearRooms());
    dispatch(fetchRooms({ query: newQuery, style }));
  };

  const handleChangeStyle = selectedStyle => {
    setStyle(selectedStyle);
    dispatch(setStyleFilter(selectedStyle));
    dispatch(clearRooms());
    dispatch(fetchRooms({ query, style: selectedStyle }));
  };

  return (
    <div className="rooms__filters">
      <SearchBox
        name="room_query"
        placeholder="Search room"
        debounce={1000}
        onChange={handleChangeQuery}
      />
    </div>
  );
};

RoomsFilter.propTypes = {};

export default RoomsFilter;

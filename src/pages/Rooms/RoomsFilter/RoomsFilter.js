import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
/** Actions */
import { setQueryFilter, clearRooms, fetchRooms } from '@context/rooms';
/** Components */
import SearchBox from '@components/SearchBox';
/** Styles */
import './RoomsFilter.scss';

const RoomsFilter = () => {
  const { filters } = useSelector(state => state.rooms);
  const dispatch = useDispatch();
  const intl = useIntl();

  const handleChangeQuery = newQuery => {
    dispatch(setQueryFilter(newQuery));
    // Reset room list with new query
    dispatch(clearRooms());
    dispatch(fetchRooms({ query: newQuery, style: filters.style }));
  };

  // const handleChangeStyle = selectedStyle => {
  //   setStyle(selectedStyle);
  //   dispatch(setStyleFilter(selectedStyle));
  //   dispatch(clearRooms());
  //   dispatch(fetchRooms({ query, style: selectedStyle }));
  // };

  return (
    <div className="rooms__filters">
      <SearchBox
        name="room_query"
        placeholder={intl.formatMessage({
          id: 'app.pages.Rooms.RoomsFilter.RoomsFilterSearchBoxPlaceholder',
        })}
        debounce={1000}
        onChange={handleChangeQuery}
      />
    </div>
  );
};

RoomsFilter.propTypes = {};

export default RoomsFilter;

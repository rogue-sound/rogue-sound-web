import React, { useEffect, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
/** Actions */
import { fetchRooms } from '@context/rooms';
/** Components */
import RoomListItem from './RoomListItem';
import RoomListItemSkeleton from './RoomListItemSkeleton';
/** Styles */
import './RoomList.scss';

const RoomList = (style = '') => {
  const { rooms, loading, error, skip, take, hasMore } = useSelector(
    state => state.rooms
  );
  const observer = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchRooms(style, skip, take));
  }, [dispatch]);

  const goToRoom = id => {
    history.push(`/rooms/${id}`);
  };

  const observerHandler = useCallback(
    entries => {
      if (entries[0].isIntersecting && hasMore) {
        dispatch(fetchRooms(style, skip, take));
      }
    },
    [hasMore, style, skip, take]
  );

  const lastRoomRef = useCallback(
    node => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      // Create observer
      observer.current = new IntersectionObserver(observerHandler, {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      });

      // Observe the last item
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading]
  );

  return (
    <div className="room__list">
      {rooms.map((room, index) => {
        const isLastRoom = rooms.length === index + 1;
        const ref = isLastRoom ? lastRoomRef : undefined;
        return (
          <RoomListItem
            room={room}
            key={room.id}
            ref={ref}
            onClick={goToRoom}
          />
        );
      })}
      {loading &&
        Array(3)
          .fill(null)
          .map((_, index) => (
            <RoomListItemSkeleton key={`room_skeleton_${index}`} />
          ))}
      {error && <p>Cannot display rooms.</p>}
    </div>
  );
};

RoomList.propTypes = {};

export default RoomList;

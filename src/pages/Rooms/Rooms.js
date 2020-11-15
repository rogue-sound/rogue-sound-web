import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
/** Actions */
import { fetchRooms } from '@context/rooms';
/** Components */
import Layout from '@layout';
/** Styles */
import './Rooms.scss';

const Rooms = () => {
  const { rooms, loading, error, skip, take, hasMore } = useSelector(
    state => state.rooms
  );
  const [style, setStyle] = useState('');
  const observer = useRef();
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
    <Layout>
      <div className="rooms__list">
        {rooms.map(({ id, name, creator, style: roomStyle }, index) => (
          <div
            key={id}
            ref={rooms.length === index + 1 ? lastRoomRef : undefined}
            className="rooms__room"
            onClick={() => goToRoom(id)}
          >
            <h4 className="room__name">{name}</h4>
            <span className="room__creator">Created by {creator}</span>
            <span className="room__style">{roomStyle}</span>
          </div>
        ))}
        {loading && <p>Loading...</p>}
        {error && <p>Cannot display rooms.</p>}
      </div>
    </Layout>
  );
};

Rooms.propTypes = {};

export default Rooms;

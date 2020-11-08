import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
/** Actions */
import { fetchRooms } from '@context/rooms';
/** Components */
import Layout from '@layout';
/** Styles */
import './Rooms.scss';

const Rooms = () => {
  const { rooms, loading, error } = useSelector(state => state.rooms);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const goToRoom = id => {
    history.push(`/rooms/${id}`);
  };

  const renderRooms = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Cannot display rooms.</p>;

    return rooms.map(({ id, name, creator, style }) => (
      <div key={id} className="rooms__room" onClick={() => goToRoom(id)}>
        <h4 className="room__name">{name}</h4>
        <span className="room__creator">Created by {creator}</span>
        <span className="room__style">{style}</span>
      </div>
    ));
  };

  return (
    <Layout>
      <div className="rooms__list">{renderRooms()}</div>
    </Layout>
  );
};

Rooms.propTypes = {};

export default Rooms;

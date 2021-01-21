import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
/** Components */
import Layout from '@layout';
import { fetchStyles } from '@context/rooms';
import RoomsFilter from './RoomsFilter';
import RoomList from './RoomList';
import CreateRoom from './CreateRoom';
/** Styles */
import './Rooms.scss';

const Rooms = () => {
  const { token } = useSelector(state => state.auth);
  const { styles } = useSelector(state => state.rooms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStyles());
  }, []);

  return (
    <Layout>
      <div className="rooms__container">
        <div className="rooms__wrapper">
          <RoomsFilter />
          <RoomList />
        </div>
        {token && <CreateRoom styles={styles} />}
      </div>
    </Layout>
  );
};

Rooms.propTypes = {};

export default Rooms;

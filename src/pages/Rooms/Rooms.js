import React from 'react';
/** Components */
import Layout from '@layout';
import RoomsFilter from './RoomsFilter';
import RoomList from './RoomList';
import CreateRoom from './CreateRoom';
/** Styles */
import './Rooms.scss';

const Rooms = () => (
  <Layout>
    <div className="rooms__container">
      <div className="rooms__wrapper">
        <RoomsFilter />
        <RoomList />
      </div>
      <CreateRoom />
    </div>
  </Layout>
);

Rooms.propTypes = {};

export default Rooms;

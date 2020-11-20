import React, { useState } from 'react';
/** Components */
import Layout from '@layout';
import RoomList from './RoomList';
import CreateRoom from './CreateRoom';
/** Styles */
import './Rooms.scss';

const Rooms = () => {
  const [style, setStyle] = useState('');

  return (
    <Layout>
      <div className="rooms__container">
        <RoomList style={style} />
        <CreateRoom />
      </div>
    </Layout>
  );
};

Rooms.propTypes = {};

export default Rooms;

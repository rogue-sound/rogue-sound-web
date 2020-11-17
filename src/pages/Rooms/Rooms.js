import React, { useState } from 'react';
/** Components */
import Layout from '@layout';
import RoomList from './RoomList';
/** Styles */
import './Rooms.scss';

const Rooms = () => {
  const [style, setStyle] = useState('');

  return (
    <Layout>
      <RoomList style={style} />
    </Layout>
  );
};

Rooms.propTypes = {};

export default Rooms;

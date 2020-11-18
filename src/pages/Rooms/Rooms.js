import React, { useState } from 'react';
/** Common components */
import Dropdown from '@common/Dropdown';
/** Components */
import Layout from '@layout';
import RoomList from './RoomList';
/** Styles */
import './Rooms.scss';

const styles = [
  { id: 'chill', name: 'Chill' },
  { id: 'random', name: 'Random' },
  { id: 'party', name: 'Party' },
];

const Rooms = () => {
  const [style, setStyle] = useState('');

  const handleStyleChange = selectedStyle => {
    setStyle(selectedStyle);
  };

  return (
    <Layout>
      <>
        <div className="rooms__dropdown">
          <Dropdown
            options={styles}
            placeholder="Select a style"
            onChange={handleStyleChange}
          />
        </div>
        <RoomList style={style} />
      </>
    </Layout>
  );
};

Rooms.propTypes = {};

export default Rooms;

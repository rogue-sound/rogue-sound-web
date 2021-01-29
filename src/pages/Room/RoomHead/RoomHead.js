import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const RoomHead = ({ room, playing }) => {
  return (
    <Helmet>
      <title>{`[${playing ? '▶️' : '⏸️'}] ${room.name} | Rogue Sound`}</title>
    </Helmet>
  );
};

RoomHead.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    creator: PropTypes.string,
  }),
  playing: PropTypes.bool,
};

export default RoomHead;

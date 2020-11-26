import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { getRandomInt } from '@utils';
/** Styles */
import './RoomListItem.scss';

// Temporal because backend is lazy af
const randomImg = () => {
  const number = getRandomInt(1, 9);
  return `https://roguesounddata.blob.core.windows.net/rooms/room${number}.jpg`;
};

const RoomListItem = forwardRef(
  (
    { room: { id, name, user: { displayName }, style, img } = {}, onClick },
    ref
  ) => (
    <div
      ref={ref}
      className="room__item"
      onClick={() => onClick(id)}
      style={{ backgroundImage: img ? `url(${img})` : `url(${randomImg()})` }}
    >
      <div className="room__details">
        <h4 className="room__name">{name}</h4>
        <span className="room__creator">Created by {displayName}</span>
        {style && <span className="room__style">{style.name}</span>}
      </div>
    </div>
  )
);

RoomListItem.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    creator: PropTypes.string,
    style: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
  onClick: PropTypes.func,
};

export default RoomListItem;

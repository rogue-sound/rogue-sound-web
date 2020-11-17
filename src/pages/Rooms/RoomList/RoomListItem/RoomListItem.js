import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
/** Styles */
import './RoomListItem.scss';

const RoomListItem = forwardRef(
  ({ room: { id, name, creator, style, image } = {}, onClick }, ref) => (
    <div
      ref={ref}
      className="room__item"
      onClick={() => onClick(id)}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="room__details">
        <h4 className="room__name">{name}</h4>
        <span className="room__creator">Created by {creator}</span>
        <span className="room__style">{style}</span>
      </div>
    </div>
  )
);

RoomListItem.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    creator: PropTypes.string,
    style: PropTypes.string,
  }),
  onClick: PropTypes.func,
};

export default RoomListItem;

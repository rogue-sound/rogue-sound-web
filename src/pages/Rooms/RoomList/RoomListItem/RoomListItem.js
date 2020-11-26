import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
/** Styles */
import './RoomListItem.scss';

const RoomListItem = forwardRef(
  (
    { room: { id, name, user: { displayName }, style, img } = {}, onClick },
    ref
  ) => (
    <div
      ref={ref}
      className="room__item"
      onClick={() => onClick(id)}
      {...(img && { style: { backgroundImage: `url(${img})` } })}
    >
      <div className="room__details">
        <h4 className="room__name">{name}</h4>
        <span className="room__creator">Created by {displayName}</span>
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
    style: PropTypes.number,
  }),
  onClick: PropTypes.func,
};

export default RoomListItem;

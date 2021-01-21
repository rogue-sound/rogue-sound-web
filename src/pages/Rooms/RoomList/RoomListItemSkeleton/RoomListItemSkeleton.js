import React from 'react';
/** Styles */
import './RoomListItemSkeleton.scss';

const RoomListItemSkeleton = () => (
  <div className="room-skeleton__item">
    <div className="room-skeleton__details">
      <div className="room-skeleton__name" />
      <div className="room-skeleton__creator" />
      <div className="room-skeleton__style" />
    </div>
  </div>
);

export default RoomListItemSkeleton;

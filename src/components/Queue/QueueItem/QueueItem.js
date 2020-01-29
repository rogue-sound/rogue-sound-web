import React from 'react';
import PropTypes from 'prop-types';

const QueueItem = ({ albumName, albumImg, title, artist, user }) => {
  return (
    <div className="queue-item">
      <img src={albumImg} alt={albumName} />
      <div className="queue-item__details">
        <h4>{title}</h4>
        <h5>{artist}</h5>
        {/* FA-ALIGN-JUSTIFY */}
        <span>{user}</span>
      </div>
    </div>
  );
};

QueueItem.propTypes = {
  // className: PropTypes.string,
  albumName: PropTypes.string,
  albumImg: PropTypes.string,
  title: PropTypes.string,
  artist: PropTypes.string,
  user: PropTypes.string,
};

export default QueueItem;

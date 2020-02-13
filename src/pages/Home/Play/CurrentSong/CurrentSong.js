import React from 'react';
import PropTypes from 'prop-types';

import './CurrentSong.scss';

const CurrentSong = ({ albumImg, title, artist, album }) => {
  return (
    <div className="currently-playing">
      <img src={albumImg} alt={album} />
      <h3>{title}</h3>
      <h4>{artist}</h4>
    </div>
  );
};

CurrentSong.propTypes = {
  albumImg: PropTypes.string,
  title: PropTypes.string,
  artist: PropTypes.string,
  album: PropTypes.string,
};

export default CurrentSong;

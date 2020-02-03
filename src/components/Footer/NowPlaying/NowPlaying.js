import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './NowPlaying.scss';

const NowPlaying = ({ title, artist }) => {
  return (
    <div className="now-playing">
      <FontAwesomeIcon icon="volume-up" />
      <div className="now-playing__details">
        <h4>{title}</h4>
        <h5>{artist}</h5>
      </div>
    </div>
  );
};

NowPlaying.propTypes = {
  title: PropTypes.string,
  artist: PropTypes.string,
};

export default NowPlaying;

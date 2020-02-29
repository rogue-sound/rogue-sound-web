import React from 'react';
import PropTypes from 'prop-types';
/** Styled components */
import { ProgressBarContainer, ProgressBarPlaying } from './ProgressBar.styled';

const ProgressBar = ({ publicId, duration = 0, currentTime = 0 }) => (
  <ProgressBarContainer>
    {!!duration && !!currentTime && (
      <ProgressBarPlaying
        key={publicId}
        duration={duration}
        currentTime={currentTime}
      />
    )}
  </ProgressBarContainer>
);

ProgressBar.propTypes = {
  publicId: PropTypes.string,
  duration: PropTypes.number,
  currentTime: PropTypes.number,
};

export default ProgressBar;

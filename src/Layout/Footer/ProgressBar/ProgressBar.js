import React from 'react';
import PropTypes from 'prop-types';
/** Styled components */
import { ProgressBarContainer, ProgressBarPlaying } from './ProgressBar.styled';

const ProgressBar = ({ duration, currentTime }) => {
  const currentPercentage = (currentTime / duration) * 100;

  return (
    <ProgressBarContainer>
      <ProgressBarPlaying percentage={currentPercentage} />
    </ProgressBarContainer>
  );
};

ProgressBar.propTypes = {
  duration: PropTypes.number,
  currentTime: PropTypes.number,
};

export default ProgressBar;

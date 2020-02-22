import React from 'react';
import PropTypes from 'prop-types';
/** Styled components */
import {
  ProgressBarContainer,
  ProgressBarPlaying,
  ProgressBarKnob,
} from './ProgressBar.styled';

const ProgressBar = ({ duration, currentTime }) => {
  const currentPercentage = (currentTime / duration) * 100;

  return (
    <ProgressBarContainer>
      <ProgressBarPlaying
        style={{
          background: `linear-gradient(to right, #01ab6d ${currentPercentage}%, #d6d6d6 0)`,
        }}
      >
        {!!currentTime && (
          <ProgressBarKnob
            style={{ left: `calc(${currentPercentage}% - 9px)` }}
          />
        )}
      </ProgressBarPlaying>
    </ProgressBarContainer>
  );
};

ProgressBar.propTypes = {
  duration: PropTypes.number,
  currentTime: PropTypes.number,
};

export default ProgressBar;

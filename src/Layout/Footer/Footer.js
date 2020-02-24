import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
/** Utils */
import { ProgressBarConstants } from '@utils/constants';
/** Components */
import ProgressBar from './ProgressBar';
import NowPlaying from './NowPlaying';
/** Styled components */
import { FooterContainer, FooterWrapper } from './Footer.styled';

const Footer = () => {
  const [songPosition, setSongPosition] = useState(0);
  const [songInterval, setSongInterval] = useState(0);

  const current = useSelector(state => state.playing.current);

  const { position: currentPosition } = useSelector(
    state => state.playing.current
  );

  useEffect(() => {
    if (currentPosition !== undefined) {
      setSongPosition(currentPosition);
      songInterval && clearInterval(songInterval);
      setSongInterval(
        setInterval(() => {
          setSongPosition(
            prevSongPosition =>
              prevSongPosition + ProgressBarConstants.INTERVAL_DURATION
          );
        }, ProgressBarConstants.INTERVAL_DURATION)
      );
    } else {
      setSongPosition(0);
      clearInterval(songInterval);
    }
    return () => clearInterval(songInterval);
  }, [currentPosition]);

  return (
    <FooterContainer>
      <ProgressBar duration={current.duration} currentTime={songPosition} />
      <FooterWrapper className="footer">
        {current.title && <NowPlaying {...current} />}
      </FooterWrapper>
    </FooterContainer>
  );
};

Footer.propTypes = {};

export default Footer;

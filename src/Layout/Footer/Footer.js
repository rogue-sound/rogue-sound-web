import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
/** Components */
import ProgressBar from './ProgressBar';
/** Styled components */
import { FooterContainer, FooterWrapper } from './Footer.styled';
import NowPlaying from './NowPlaying';

const Footer = () => {
  const [songPosition, setSongPosition] = useState(0);
  const [songInterval, setSongInterval] = useState(0);

  const { current } = useSelector(state => state.playing);

  const { position: currentPosition } = useSelector(
    state => state.playing.current
  );

  useEffect(() => {
    if (currentPosition !== undefined) {
      songInterval && clearInterval(songInterval);
      setSongPosition(currentPosition);
      setSongInterval(
        setInterval(() => {
          setSongPosition(prevSongPosition => prevSongPosition + 100);
        }, 100)
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

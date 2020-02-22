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
  const [songTimeout, setSongTimeout] = useState(0);
  const { current } = useSelector(state => state.playing);

  useEffect(() => {
    if (songPosition) {
      setSongTimeout(
        setTimeout(() => {
          console.log(songPosition);
          setSongPosition(songPosition + 100);
        }, 100)
      );
    }
    return () => clearTimeout(songTimeout);
  }, [songPosition]);

  useEffect(() => {
    if (current.position !== undefined) {
      setSongPosition(current.position);
    } else {
      setSongPosition(0);
      clearTimeout(songTimeout);
    }
  }, [current.position]);

  return (
    <FooterContainer>
      <ProgressBar duration={current.duration} currentTime={songPosition} />
      <FooterWrapper className="footer">
        {/* <img src={placeholderLogo} alt="Rogue sound logo" /> */}
        {current.title && <NowPlaying {...current} />}
      </FooterWrapper>
    </FooterContainer>
  );
};

Footer.propTypes = {};

export default Footer;

import React from 'react';
// import PropTypes from 'prop-types';
/** Styled components */
import { FooterWrapper } from './Footer.styled';
import NowPlaying from './NowPlaying';

// TODO: Temporal, change when real logo
const placeholderLogo =
  'https://www.nicepng.com/png/full/21-217559_sine-wave-sound-acoustic-wave-frequency-wave-sound.png';

const nowPlayingMock = {
  title: 'Las de la intuición',
  artist: 'Shakira',
};

const Footer = () => (
  <FooterWrapper className="footer">
    <img src={placeholderLogo} alt="Rogue sound logo" />
    <NowPlaying {...nowPlayingMock} />
  </FooterWrapper>
);

Footer.propTypes = {};

export default Footer;

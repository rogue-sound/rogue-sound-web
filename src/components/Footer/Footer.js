import React from 'react';
import { useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
/** Styled components */
import { FooterWrapper } from './Footer.styled';
import NowPlaying from './NowPlaying';

const Footer = () => {
  const { current } = useSelector(state => state.playing);

  return (
    <FooterWrapper className="footer">
      {/* <img src={placeholderLogo} alt="Rogue sound logo" /> */}
      {current.title && <NowPlaying {...current} />}
    </FooterWrapper>
  );
};

Footer.propTypes = {};

export default Footer;

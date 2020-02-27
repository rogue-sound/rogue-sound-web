import React from 'react';
import { useSelector } from 'react-redux';
/** Utils */
/** Components */
import ProgressBar from './ProgressBar';
import NowPlaying from './NowPlaying';
/** Styled components */
import { FooterContainer, FooterWrapper } from './footer.styled';

const Footer = () => {
  const current = useSelector(state => state.playing.current);

  return (
    <FooterContainer>
      <ProgressBar
        publicId={current.publicId}
        duration={current.duration}
        currentTime={current.position}
      />
      <FooterWrapper className="footer">
        {current.title && <NowPlaying {...current} />}
      </FooterWrapper>
    </FooterContainer>
  );
};

Footer.propTypes = {};

export default Footer;

import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/** Services */
import { skipCurrentSong } from '@services/api';
/** Utils */
/** Components */
import ProgressBar from './ProgressBar';
import NowPlaying from './NowPlaying';
/** Styled components */
import { FooterContainer, FooterWrapper } from './footer.styled';

import './SkipButton.scss';

const Footer = () => {
  const current = useSelector(state => state.playing.current);

  const skipHandler = useCallback(async () => {
    skipCurrentSong();
  }, [current]);

  return (
    <FooterContainer>
      <ProgressBar
        publicId={current.publicId}
        duration={current.duration}
        currentTime={current.position}
      />
      <FooterWrapper className="footer">
        <FontAwesomeIcon
          icon="forward"
          title="Skip current song"
          className="skip-button"
          onClick={skipHandler}
        />
        {current.title && <NowPlaying {...current} />}
      </FooterWrapper>
    </FooterContainer>
  );
};

Footer.propTypes = {};

export default Footer;

import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/** Services */
import { getCurrent, skipCurrentSong } from '@services/api';
/** Utils */
/** Components */
import ProgressBar from './ProgressBar';
import NowPlaying from './NowPlaying';
/** Styled components */
import { FooterContainer, FooterWrapper } from './footer.styled';

import './SkipButton.scss';

const skipHandler = async () => {
  const { current } = await getCurrent();
  console.log(current);
  if (current) {
    const roomSessionModel = { roomSessionId: current.publicId };
    skipCurrentSong(roomSessionModel);
  }
};

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

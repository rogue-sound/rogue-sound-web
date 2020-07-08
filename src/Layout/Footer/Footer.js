import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/** Utils */
/** Components */
import ProgressBar from './ProgressBar';
import NowPlaying from './NowPlaying';
/** Styled components */
import { FooterContainer, FooterWrapper } from './footer.styled';
/**Services */
import { getCurrent, skipCurrentSong } from '@services/api';

import './SkipButton.scss';

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

const skipHandler = async () => {
  const { current } = await getCurrent();
  console.log(current);
  if (current) {
    const roomSessionModel = { roomSessionId: current.publicId };
    skipCurrentSong(roomSessionModel);
  }
}

export default Footer;

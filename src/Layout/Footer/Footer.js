import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useIntl } from 'react-intl';
import { TooltipGate } from 'react-a-gate';
/** Components */
import ProgressBar from './ProgressBar';
import NowPlaying from './NowPlaying';
/** Styled components */
import {
  FooterContainer,
  FooterWrapper,
  FooterItems,
  AddToLikedSongs,
} from './footer.styled';
/** Services */
import {
  checkIfUserLikedSongsContainsSong,
  addOrRemoveLikedSong,
} from '../../services/spotify';

const Footer = () => {
  const intl = useIntl();
  const current = useSelector(state => state.playing.current);
  const [isALikedSong, setIsALikedSong] = useState(false);

  const isInLikedSongs = useCallback(async songId => {
    const res = await checkIfUserLikedSongsContainsSong(songId);
    if (res) setIsALikedSong(res[0]);
  }, []);

  useEffect(() => {
    if (current?.songId) {
      const songId = current.songId.replace('spotify:track:', '');
      isInLikedSongs(songId);
    }
  }, [current.songId, isInLikedSongs]);

  const handleLikedSong = async () => {
    const songId = current.songId.replace('spotify:track:', '');
    await addOrRemoveLikedSong(songId, isALikedSong);
    isInLikedSongs(songId);
  };

  return (
    <FooterContainer>
      <ProgressBar
        publicId={current.publicId}
        duration={current.duration}
        currentTime={current.position}
      />
      <FooterWrapper className="footer">
        {current.title && (
          <FooterItems>
            <TooltipGate
              content={intl.formatMessage({
                id: isALikedSong
                  ? 'app.Layout.Footer.UnlikedSongsTooltip'
                  : 'app.Layout.Footer.LikedSongsTooltip',
              })}
              place="top"
            >
              <AddToLikedSongs
                isALikedSong={isALikedSong}
                onClick={() => handleLikedSong()}
              >
                <FontAwesomeIcon icon="heart" />
              </AddToLikedSongs>
            </TooltipGate>
            <NowPlaying {...current} />
          </FooterItems>
        )}
      </FooterWrapper>
    </FooterContainer>
  );
};

Footer.propTypes = {};

export default Footer;

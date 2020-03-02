import React from 'react';
import PropTypes from 'prop-types';
import { textDuration } from '@utils';

const SongResult = ({ song, onClickCallback }) => {
  const handleClick = songSelected => {
    onClickCallback && onClickCallback(songSelected);
  };

  const {
    duration_ms: durationMs,
    name,
    uri,
    artists,
    album: { name: albumName, images },
  } = song;

  const artistsMap = artists.map(artist => artist.name).join(', ');
  const albumImg =
    images && images[1] ? images[1].url : images[0] && images[0].url;

  return (
    <div
      role="button"
      tabIndex="0"
      className="song-result-item"
      onKeyDown={e => {
        if (e.key === 'Enter') {
          handleClick({
            songId: uri,
            duration: durationMs,
            albumName,
            albumImg,
            title: name,
            artist: artistsMap,
          });
        }
      }}
      onClick={() =>
        handleClick({
          songId: uri,
          duration: durationMs,
          albumName,
          albumImg,
          title: name,
          artist: artistsMap,
        })
      }
    >
      <img src={albumImg} alt={albumName} />
      <div className="song-result-item__description">
        <h5>{artistsMap}</h5>
        <h4>{name}</h4>
        <span className="song-result-item__duration">
          {textDuration(durationMs)}
        </span>
        <span className="song-result-item__album">{albumName}</span>
      </div>
    </div>
  );
};

SongResult.propTypes = {
  onClickCallback: PropTypes.func,
  song: PropTypes.shape({
    duration_ms: PropTypes.number,
    name: PropTypes.string,
    uri: PropTypes.string,
    artists: PropTypes.array,
    album: PropTypes.object,
  }).isRequired,
};

export default SongResult;

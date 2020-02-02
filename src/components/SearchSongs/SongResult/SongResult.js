import React from 'react';
import { textDuration } from '@utils';

const SongResult = props => {
  const handleClick = (songId, duration) => {
    const { onClickCallback } = props;
    onClickCallback && onClickCallback({ songId, duration });
  };

  const {
    duration_ms,
    name,
    uri,
    artists,
    album: { name: albumName, images },
  } = props.song;

  const artistsMap = artists.map(artist => artist.name).join(', ');
  const albumImg = images[1].url;

  return (
    <div
      className="song-result-item"
      onClick={() => handleClick(uri, duration_ms)}
    >
      <img src={albumImg} />
      <div className="song-result-item__description">
        <h5>{artistsMap}</h5>
        <h4>{name}</h4>
        <span className="song-result-item__duration">
          {textDuration(duration_ms)}
        </span>
        <span className="song-result-item__album">{albumName}</span>
      </div>
    </div>
  );
};

export default SongResult;

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { textDuration } from '@utils';

const SongResult = props => {
  const handleClick = song => {
    const { onClickCallback } = props;
    onClickCallback && onClickCallback(song);
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
      onClick={() =>
        handleClick({
          songId: uri,
          duration: duration_ms,
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
          {textDuration(duration_ms)}
        </span>
        <span className="song-result-item__album">{albumName}</span>
      </div>
    </div>
  );
};

export default SongResult;

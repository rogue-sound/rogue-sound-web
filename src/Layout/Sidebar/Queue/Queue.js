import React from 'react';
import { useSelector } from 'react-redux';
import QueueItem from './QueueItem';
/** Styles */
import './Queue.scss';

const Queue = () => {
  const { queue, current } = useSelector(state => state.playing);
  return (
    <div className="queue-container">
      <div className="queue-list">
        {queue.map(item => (
          <QueueItem key={item.publicId} {...item} current={current.songId} />
        ))}
      </div>
    </div>
  );
};

Queue.propTypes = {};

export default Queue;

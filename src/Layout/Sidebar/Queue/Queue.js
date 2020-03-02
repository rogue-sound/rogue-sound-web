import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useIntl } from 'react-intl';
import QueueItem from './QueueItem';
/** Styles */
import './Queue.scss';

const Queue = () => {
  const intl = useIntl();
  const { queue, current } = useSelector(state => state.playing);
  return (
    <div className="queue-container">
      {/* delete this when using the tabs */}
      <div className="queue-top">
        <FontAwesomeIcon icon="align-justify" />
        <span>
          {intl.formatMessage({
            id: 'app.layout.Sidebar.Queue.QueueText',
          })}
        </span>
      </div>
      {/* until here */}
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

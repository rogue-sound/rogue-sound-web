import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
/** Styled components */
import QueueItem from './QueueItem';
// import { SidebarWrapper } from './sidebar.styled';
import './Queue.scss';

// TODO: Replace key with provided ID
const Queue = ({ intl }) => {
  const { queue, current } = useSelector(state => state.playing);
  return (
    <div className="queue-container">
      <div className="queue-top">
        <FontAwesomeIcon icon="align-justify" />
        <span>
          {intl.formatMessage({
            id: 'app.components.Queue.Queue',
          })}
        </span>
      </div>
      <div className="queue-list">
        {queue.map(item => (
          <QueueItem
            key={`queued-song-${item.title}`}
            {...item}
            current={current.songId}
          />
        ))}
      </div>
    </div>
  );
};

Queue.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }).isRequired,
};

export default Queue;
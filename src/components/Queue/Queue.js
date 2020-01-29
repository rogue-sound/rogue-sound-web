import React from 'react';
// import PropTypes from 'prop-types';
/** Styled components */
import QueueItem from './QueueItem';
// import { SidebarWrapper } from './sidebar.styled';
import './Queue.scss';

const mockedItems = [
  {
    albumName: 'Album',
    albumImg:
      'https://images.unsplash.com/photo-1461696114087-397271a7aedc?fm=jpg&w=1080&fit=max&ixid=eyJhcHBfaWQiOjYzNDZ9',
    title: 'Torero',
    artist: 'Chayanne',
    user: 'ApoloeXp',
  },
  {
    albumName: 'Album',
    albumImg:
      'https://images.unsplash.com/photo-1548192746-dd526f154ed9?fm=jpg&w=1080&fit=max&ixid=eyJhcHBfaWQiOjYzNDZ9',
    title: 'The Less I Know The Better',
    artist: 'Tame Impala',
    user: 'bonavida',
  },
];

const Queue = () => (
  <div className="queue-container">
    <div className="queue-list">
      {mockedItems.map(item => (
        <QueueItem {...item} />
      ))}
    </div>
  </div>
);

Queue.propTypes = {};

export default Queue;

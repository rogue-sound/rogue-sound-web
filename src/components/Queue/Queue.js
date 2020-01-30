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
  {
    albumName: 'Album',
    albumImg:
      'https://images.unsplash.com/photo-1504083898675-c896ecdae86e?fm=jpg&w=1080&fit=max&ixid=eyJhcHBfaWQiOjYzNDZ9',
    title: 'Anaconda',
    artist: 'Nicki Minaj',
    user: 'mateoberno',
  },
  {
    albumName: 'Album',
    albumImg:
      'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?fm=jpg&w=1080&fit=max&ixid=eyJhcHBfaWQiOjYzNDZ9',
    title: 'Sin Pijama',
    artist: 'Becky G',
    user: 'tigresadeloriente',
  },
  {
    albumName: 'Album',
    albumImg:
      'https://images.unsplash.com/photo-1549007247-d4399d43df67?fm=jpg&w=1080&fit=max&ixid=eyJhcHBfaWQiOjYzNDZ9',
    title: 'Calocha',
    artist: 'Barbie Rican ft. Jamsha',
    user: 'protein_as',
  },
  {
    albumName: 'Album',
    albumImg:
      'https://images.unsplash.com/photo-1541164757216-e5c2c2b5d69b?fm=jpg&w=1080&fit=max&ixid=eyJhcHBfaWQiOjYzNDZ9',
    title: 'Girlfriend (Spanish Version)',
    artist: 'Avril Lavigne',
    user: 'avrilTheQueen',
  },
  {
    albumName: 'Album',
    albumImg:
      'https://images.unsplash.com/photo-1527500335527-cdb637d6d605?fm=jpg&w=1080&fit=max&ixid=eyJhcHBfaWQiOjYzNDZ9',
    title: 'Gasolina',
    artist: 'Daddy Yankee',
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

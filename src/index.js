import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from '@store';
/** Components */
import App from './App';
/** Styles */
import './styles/styles.scss';

const mountNode = document.getElementById('app');
render(
  <Provider store={store}>
    <App />
  </Provider>,
  mountNode
);

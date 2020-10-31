import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from '@store';
/** Utils */
import { githubSPA } from '@utils';
/** Components */
import App from './app';
/** Styles */
import '@styles/styles.scss';

if (process.env.ENVIRONMENT_MODE && process.env.ENVIRONMENT_MODE !== 'dev')
  githubSPA();

const mountNode = document.getElementById('root');
render(
  <Provider store={store}>
    <App />
  </Provider>,
  mountNode
);

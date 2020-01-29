import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './styles/styles.scss';

const mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);

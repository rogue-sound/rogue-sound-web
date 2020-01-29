import React from 'react';
import ReactDOM from 'react-dom';
/** Components */
import App from './App';
/** Styles */
import './styles/styles.scss';

const mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);

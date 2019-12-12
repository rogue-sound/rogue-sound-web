/* Libraries */
import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
/** Components */
import { Routes } from './routes/routes';
/* Themes */
import darkTheme from './themes/dark-theme';
import lightTheme from './themes/light-theme';

import './styles/poc.scss';

const themes = {
  dark: darkTheme,
  light: lightTheme,
};

const routes = Routes();

const App = () => {
  const [theme, setTheme] = useState('dark');

  return (
    <ThemeProvider theme={themes[theme]}>
      <BrowserRouter basename="/"> {routes} </BrowserRouter>
      <div> APP </div>
    </ThemeProvider>
  );
};

export default hot(App);

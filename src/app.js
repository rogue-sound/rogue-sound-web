import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { ThemeProvider } from 'styled-components';
/** Components */
import { Routes } from './routes/Routes';
/** Themes */
import darkTheme from './themes/dark-theme';
import lightTheme from './themes/light-theme';
/** Styles */
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

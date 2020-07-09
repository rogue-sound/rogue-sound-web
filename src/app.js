import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
/** Context */
import { setTokenAction } from '@context/auth';
/** Components */
import { Routes } from './routes/routes';
/** Themes */
import darkTheme from './themes/dark-theme';
import lightTheme from './themes/light-theme';
/** Translations data */
import esTranslations from './i18n/es.json';
import enTranslations from './i18n/en.json';
/** Utils */
import { retrieveSpotifyToken } from '@utils';
import './utils/FontAwesomeLibrary';

const themes = {
  dark: darkTheme,
  light: lightTheme,
};
const translations = {
  es: esTranslations,
  en: enTranslations,
};

const routes = Routes();

const App = () => {
  // const [theme, setTheme] = useState('dark');
  const theme = 'dark';
  const { language } = useSelector(state => state.languageSettings);
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.hash) {
      const _token = retrieveSpotifyToken();
      _token && dispatch(setTokenAction(_token));
    }
  }, []);

  return (
    <ThemeProvider theme={themes[theme]}>
      <BrowserRouter basename="/">
        <IntlProvider
          key={language}
          locale={language}
          messages={translations[language]}
        >
          {routes}
        </IntlProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default hot(App);

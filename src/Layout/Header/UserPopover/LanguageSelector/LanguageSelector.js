import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLanguage } from '@context/languageSettings';
import './LanguageSelector.scss';
import ESFlag from '@assets/img/es.png';
import ENFlag from '@assets/img/en.png';
import { useIntl } from 'react-intl';

const LanguageSelector = () => {
  const { language } = useSelector(state => state.languageSettings);
  const intl = useIntl();
  const dispatch = useDispatch();

  const toggleLanguageFn = () => {
    language === 'en'
      ? dispatch(toggleLanguage('es'))
      : dispatch(toggleLanguage('en'));
  };

  return (
    <div className="language-flag">
      {intl.formatMessage({ id: 'app.layout.Header.LanguagesLabel' })}
      <button
        type="button"
        onClick={toggleLanguageFn}
        onKeyDown={toggleLanguageFn}
      >
        <img src={language === 'en' ? ENFlag : ESFlag} alt={language} />
      </button>
    </div>
  );
};

export default LanguageSelector;

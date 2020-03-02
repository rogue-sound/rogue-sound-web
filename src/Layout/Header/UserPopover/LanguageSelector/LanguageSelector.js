import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLanguage } from '@context/languageSettings';
import './LanguageSelector.scss';
import ESFlag from '@assets/img/es.png';
import ENFlag from '@assets/img/en.png';

const LanguageSelector = () => {
  const { language: current } = useSelector(state => state.languageSettings);
  const dispatch = useDispatch();

  const dispatchLanguage = language => {
    if (current !== language) dispatch(toggleLanguage(language));
  };

  const flagOpacity = language => {
    if (current !== language) return { style: { opacity: 0.33 } };
    return null;
  };

  return (
    <div className="language-flag">
      <button
        type="button"
        onClick={() => dispatchLanguage('es')}
        onKeyDown={() => dispatchLanguage('es')}
      >
        <img src={ESFlag} alt="es" {...flagOpacity('es')} />
      </button>
      <button
        type="button"
        onClick={() => dispatchLanguage('en')}
        onKeyDown={() => dispatchLanguage('en')}
      >
        <img src={ENFlag} alt="en" {...flagOpacity('en')} />
      </button>
    </div>
  );
};

export default LanguageSelector;

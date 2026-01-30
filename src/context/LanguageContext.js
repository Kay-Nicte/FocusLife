import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  initializeI18n,
  setLanguage,
  getLanguageSetting,
  getCurrentLocale,
  t as translate,
  LANGUAGES,
} from '../i18n';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState('system');
  const [locale, setLocale] = useState('en');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const activeLocale = await initializeI18n();
      const savedSetting = await getLanguageSetting();
      setCurrentLanguage(savedSetting);
      setLocale(activeLocale);
      setIsReady(true);
    };
    init();
  }, []);

  const changeLanguage = useCallback(async (langCode) => {
    const newLocale = await setLanguage(langCode);
    setCurrentLanguage(langCode);
    setLocale(newLocale);
  }, []);

  // Translation function that triggers re-render
  const t = useCallback((key, options) => {
    return translate(key, options);
  }, [locale]);

  const value = {
    currentLanguage,
    locale,
    changeLanguage,
    t,
    isReady,
    languages: LANGUAGES,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Export t for use outside of components (like notification service)
export { translate as t };

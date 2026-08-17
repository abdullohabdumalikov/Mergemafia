import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('artisan_theme') || 'dark');
  const [lang, setLang] = useState(() => localStorage.getItem('artisan_lang') || 'uz');

  useEffect(() => {
    localStorage.setItem('artisan_theme', theme);
    document.body.className = theme === 'light' ? 'light-mode' : 'dark-mode';
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('artisan_lang', lang);
  }, [lang]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const changeLang = (newLang) => {
    if (translations[newLang]) {
      setLang(newLang);
    }
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations['uz']?.[key] || key;
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, lang, changeLang, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState('ru');

  useEffect(() => {
    const savedLanguage = getCookie('language') as string || 'ru';
    setLanguageState(savedLanguage);
  }, []);

  const setLanguage = (newLanguage: string) => {
    setLanguageState(newLanguage);
    setCookie('language', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
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

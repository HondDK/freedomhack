'use client'

import { getCookie, setCookie } from 'cookies-next';
import { createContext, useContext, ReactNode, useEffect, useState } from 'react';

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState('ru');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedLanguage = (getCookie('language') as string) || 'ru';
    setLanguageState(savedLanguage);
    setIsInitialized(true);
  }, []);

  const setLanguage = (newLanguage: string) => {
    setLanguageState(newLanguage);
    setCookie('language', newLanguage);
  };

  if (!isInitialized) {
    return null;
  }

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

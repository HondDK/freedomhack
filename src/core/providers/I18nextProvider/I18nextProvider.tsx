// I18nextProvider.tsx
'use client';

import { PropsWithChildren } from 'react';
import { useLanguage } from '@/core/providers/I18nextProvider/LanguageContext';
import { I18nProviderClient } from '@/shared/config';

export function I18nextProvider(props: PropsWithChildren) {
  const { children } = props;
  const { language } = useLanguage();

  return (
    <I18nProviderClient locale={language}>
      {children}
    </I18nProviderClient>
  );
}

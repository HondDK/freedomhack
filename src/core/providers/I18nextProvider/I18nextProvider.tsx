import { PropsWithChildren } from 'react';
import { I18nProviderClient } from '@/shared/config';

export function I18nextProvider(props: PropsWithChildren) {
  const { children } = props;


  return (
    <I18nProviderClient locale={'ru'}>
      {children}
    </I18nProviderClient>
  );
}
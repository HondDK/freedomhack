'use client'

import { PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from '@/app/get-query-client';

export default function QueryProvider(props: PropsWithChildren) {
  const { children } = props;
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
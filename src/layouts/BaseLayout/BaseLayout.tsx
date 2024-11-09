'use client'

import { PropsWithChildren } from 'react';
import { Header } from './Header';

export function BaseLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-grow justify-center w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-screen-sm sm:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
          {children}
        </div>
      </main>
    </div>
  );
}

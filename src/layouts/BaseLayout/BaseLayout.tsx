import { PropsWithChildren } from 'react';
import { Header } from './Header';

export function BaseLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header/>
      <main>
        {children}
      </main>
    </div>
  )
}

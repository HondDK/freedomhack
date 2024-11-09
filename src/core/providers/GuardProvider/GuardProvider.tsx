'use client';

import { getCookie } from 'cookies-next';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';
import { LoadingSpinner } from '@/shared/ui/LoadingSpiner';

export default function GuardProvider(props: PropsWithChildren) {
  const { children } = props;
  const router = useRouter();
  const pathname = usePathname();
  const token = getCookie('authToken');

  useEffect(() => {
    if (token && (pathname === '/auth' || pathname === '/registration')) {
      router.push('/');
    }
    if (
      !token &&
      pathname !== '/auth' &&
      pathname !== '/registration' &&
      pathname !== '/' &&
      !pathname.startsWith('/vacancy')
    ) {
      router.push('/auth');
    }
  }, [token, pathname, router]);

  const condition =
    (token && (pathname === '/auth' || pathname === '/registration')) ||
    (!token && pathname !== '/auth' && pathname !== '/registration' && pathname !== '/' && !pathname.startsWith('/vacancy'));

  if (condition) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}

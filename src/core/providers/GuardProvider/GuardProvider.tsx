'use client';

import { getCookie } from 'cookies-next';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';

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

  return <>{children}</>;
}

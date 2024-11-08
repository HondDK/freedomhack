import { PropsWithChildren, useLayoutEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function GuardProvider(props: PropsWithChildren) {
  const { children } = props;

  const router = useRouter();
  const pathname = usePathname();

  // useLayoutEffect(() => {
  //   if (!isAuthorized) {
  //     router.push('');
  //     return;
  //   }
  // }, [isAuthorized, pathname, router]);


  return children;
}
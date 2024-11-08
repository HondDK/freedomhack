import { PropsWithChildren } from 'react';
import { BaseLayout } from '@/layouts';

export default function Layout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <BaseLayout>
      {children}
    </BaseLayout>
  );
}
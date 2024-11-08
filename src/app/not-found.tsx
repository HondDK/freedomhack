import dynamic from 'next/dynamic';

const NotFoundPage = dynamic(async () => ((await import('@/app-pages/NotFound')).NotFoundPage));

export default function Page() {
  return <NotFoundPage/>;
}
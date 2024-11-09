import dynamic from 'next/dynamic';

const Main = dynamic(async () => ((await import('@/app-pages/(non-authorized)')).Main));

export default function Home() {
  return <Main/>;
}
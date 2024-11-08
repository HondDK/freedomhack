import dynamic from 'next/dynamic';

const AuthPage = dynamic(async () => ((await import('@/app-pages/(non-authorized)')).AuthPage));

export default function Page() {
  return <AuthPage/>;
}
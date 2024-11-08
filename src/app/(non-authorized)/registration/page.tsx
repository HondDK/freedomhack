import dynamic from 'next/dynamic';

const RegisterPage = dynamic(async () => ((await import('@/app-pages/(non-authorized)')).RegisterPage));

export default function Page() {
  return <RegisterPage/>;
}
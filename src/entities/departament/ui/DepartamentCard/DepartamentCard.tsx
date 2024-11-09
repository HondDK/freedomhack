'use client';

import { useRouter } from 'next/navigation';
import { TGetCompaniesResDto } from '@/entities/company/api';

type TProps = {
  data: TGetCompaniesResDto[0];
};

export function DepartamentCard({ data }: TProps) {
  const router = useRouter();

  const handleClickOnCard = () => {
    router.push(`/departaments/departament/${data.id}`);
  };

  return (
    <div
      className="cursor-pointer rounded-lg w-300 bg-gray-100 p-4 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-200"
      onClick={handleClickOnCard}
    >
      <p className="text-center text-sm font-medium">{data.name}</p>
    </div>
  );
}

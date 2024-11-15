'use client';

import { useRouter } from 'next/navigation';
import { TGetCompaniesResDto } from '@/entities/company/api';

type TProps = {
  data: TGetCompaniesResDto[0];
};

export function CompanyCard({ data }: TProps) {
  const router = useRouter();

  const handleClickOnCard = () => {
    router.push(`/companies/company/${data.id}`);
  };

  return (
    <div
      className="cursor-pointer rounded-lg w-300 bg-gray-100 p-4 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-200"
      onClick={handleClickOnCard}
    >
      <img
        className="w-16 h-16 mb-4 object-contain"
        alt={`${data.name} logo`}
        src={data.logo}
      />
      <p className="text-center text-sm font-medium">{data.name}</p>
    </div>
  );
}

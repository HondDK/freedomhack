'use client';

import { useRouter } from 'next/navigation';
import { VacancyAdditionalDetails } from '@/widgets/job/ui';
import { JobVacancyRespond } from '@/features/job/ui';
import { useGetJob } from '@/entities/job/hooks/useGetJob';
import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';

type TProps = {
  id: string;
};

export function VacancyPage(props: TProps) {
  const { id } = props;
  const router = useRouter();
  const { data, isPending } = useGetJob(Number(id));

  if (isPending) {
    return <Skeleton className="h-full w-full" />;
  }

  if (!data) {
    return <p>No data available</p>;
  }

  const { company, city, country, description_ru, modified, created } = data;

  return (
    <div className="w-full px-4 py-4 mt-4 flex flex-col gap-6 lg:flex-row lg:gap-8">
      <div className="lg:w-2/3">
        <Button onClick={() => router.back()} variant={'outline'} className="mb-4">
          Назад
        </Button>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl mb-4">
            Вакансия ({data?.name_ru})
          </h1>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {company.name}
          </h2>
          <p className="text-gray-500">
            {city.name_ru}, {country.name_ru}
          </p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold tracking-tight mb-2">
            Описание
          </h3>
          <p className="text-gray-700 text-sm sm:text-base">{description_ru}</p>
        </div>
        <div className="text-gray-400 text-xs sm:text-sm">
          <p>Создано: {new Date(created).toLocaleDateString()}</p>
          <p>Обновлено: {new Date(modified).toLocaleDateString()}</p>
        </div>
        <div className="hidden lg:block mt-6">
          <h4 className="text-xl font-semibold tracking-tight mb-3">
            Расскажите нам о себе
          </h4>
          <JobVacancyRespond jobId={Number(id)} />
        </div>
      </div>
      <VacancyAdditionalDetails data={data} />
      <div className="lg:hidden order-last w-full mt-6">
        <h4 className="text-xl font-semibold tracking-tight mb-3">
          Расскажите нам о себе
        </h4>
        <JobVacancyRespond jobId={Number(id)} />
      </div>
    </div>
  );
}

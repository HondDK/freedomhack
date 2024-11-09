'use client';

import { hasCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { VacancyAdditionalDetails } from '@/widgets/job/ui';
import { JobVacancyRespond } from '@/features/job/ui';
import { useGetJob } from '@/entities/job/hooks/useGetJob';
import { useGetJobCandidates } from '@/entities/job-candidate/hooks/useGetJobCandidates';
import { ResumeCard } from '@/entities/job-candidate/ui';
import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';

type TProps = {
  id: string;
};

export function VacancyPage(props: TProps) {
  const { id } = props;
  const router = useRouter();
  const isAuth = hasCookie('authToken')
  const { data, isPending } = useGetJob(Number(id));

  const { data: candidateData, isPending: candidateLoading } = useGetJobCandidates({
    skills: data?.skills.map((skill) => skill.id),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    cities: data?.city.id,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    countries: data?.country.id,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    sub_work_directions: data?.sub_work_direction.id,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    work_direction: data?.work_direction.id,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    work_experiences: data?.work_direction.id
  })

  if (isPending) {
    return <Skeleton className="h-full w-full" />;
  }

  if (!data) {
    return <p>No data available</p>;
  }

  const { company, city, country, description_ru, modified, created } = data;

  return <>
    <div className="w-full px-4 py-4 mt-4 flex flex-col gap-6 lg:flex-row lg:gap-8">
      <div className='lg:w-2/3'>
        <Button onClick={() => router.back()} variant={'outline'} className='mb-4'>
          Назад
        </Button>
        <div className='flex flex-col gap-2 sm:flex-row sm:gap-4'>
          <h1 className='text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl mb-4'>
            Вакансия ({data?.name_ru})
          </h1>
        </div>
        <div className='mb-6'>
          <h2 className='text-xl font-semibold tracking-tight sm:text-2xl'>
            {company.name}
          </h2>
          <p className='text-gray-500'>
            {city.name_ru}, {country.name_ru}
          </p>
        </div>
        <div className='mb-6'>
          <h3 className='text-xl font-semibold tracking-tight mb-2'>
            Описание
          </h3>
          <p className='text-gray-700 text-sm sm:text-base'>{description_ru}</p>
        </div>
        <div className='text-gray-400 text-xs sm:text-sm'>
          <p>Создано: {new Date(created).toLocaleDateString()}</p>
          <p>Обновлено: {new Date(modified).toLocaleDateString()}</p>
        </div>
        {!isAuth &&
          <div className='hidden lg:block mt-6'>
            <h4 className='text-xl font-semibold tracking-tight mb-3'>
              Расскажите нам о себе
            </h4>
            <JobVacancyRespond jobId={Number(id)}/>
          </div>}
      </div>
      <VacancyAdditionalDetails data={data}/>
      {!isAuth &&
      <div className='lg:hidden order-last w-full mt-6'>
        <h4 className='text-xl font-semibold tracking-tight mb-3'>
          Расскажите нам о себе
        </h4>
        <JobVacancyRespond jobId={Number(id)}/>
      </div>}
    </div>
    <div className="mt-6 flex overflow-x-auto space-x-6">
      {candidateLoading && <p className="text-center mt-4">Загрузка...</p>}
      {candidateData?.map((resume) => (
        <div className="min-w-[200px]" key={resume.id}>
          <ResumeCard data={resume}/>
        </div>
      ))}
    </div>
  </>
}

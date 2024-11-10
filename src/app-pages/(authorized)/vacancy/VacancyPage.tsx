'use client';

import { hasCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/core/providers/I18nextProvider';
import { VacancyAdditionalDetails } from '@/widgets/job/ui';
import { JobVacancyRespond } from '@/features/job/ui';
import { useGetJob } from '@/entities/job/hooks/useGetJob';
import { useGetFilterCandidate } from '@/entities/job-candidate/hooks/useGetFilterCandidate';
import { ResumeCard } from '@/entities/job-candidate/ui';
import { useScopedI18n } from '@/shared/config';
import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';

type TProps = {
  id: string;
};

export function VacancyPage(props: TProps) {
  const { id } = props;
  const router = useRouter();
  const isAuth = hasCookie('authToken');
  const { language } = useLanguage();
  const t = useScopedI18n('base')

  const { data, isPending } = useGetJob(Number(id));

  const { data: candidateData, isPending: candidateLoading } = useGetFilterCandidate({
    skills: data?.skills?.map((skill) => skill.id) || [],
    cities: data?.city?.id ? [data.city.id] : [],
    countries: data?.country?.id ? [data.country.id] : [],
    sub_work_directions: data?.sub_work_direction?.id ? [data.sub_work_direction.id] : [],
    work_direction: data?.work_direction?.id ? [data.work_direction.id] : [],
    work_experiences: data?.work_experience?.id ? [data.work_experience.id] : []
  });

  if (isPending) {
    return <Skeleton className="h-full w-full" />;
  }

  if (!data) {
    return <p>No data available</p>;
  }

  const jobTitle = data[`name_${language}` as keyof typeof data];
  const description = data[`description_${language}` as keyof typeof data];
  const city = data.city[`name_${language}` as keyof typeof data.city];
  const country = data.country[`name_${language}` as keyof typeof data.country];

  return (
    <>
      <div className="w-full px-4 py-4 mt-4 flex flex-col gap-6 lg:flex-row lg:gap-8">
        <div className="lg:w-2/3">
          <Button onClick={() => router.back()} variant={'outline'} className="mb-4">
            {t('back')}
          </Button>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl mb-4">
              {t('vacancy')} ({jobTitle})
            </h1>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {data.company.name}
            </h2>
            <p className="text-gray-500">
              {city}, {country}
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold tracking-tight mb-2">
              {t('desc')}
            </h3>
            <p className="text-gray-700 text-sm sm:text-base">{description}</p>
          </div>
          <div className="text-gray-400 text-xs sm:text-sm">
            <p>{t('create')}: {new Date(data.created).toLocaleDateString()}</p>
            <p>{t('update')}: {new Date(data.modified).toLocaleDateString()}</p>
          </div>
          {!isAuth && (
            <div className="hidden lg:block mt-6">
              <h4 className="text-xl font-semibold tracking-tight mb-3">
                {t('meInfo')}
              </h4>
              <JobVacancyRespond jobId={Number(id)} />
            </div>
          )}
        </div>
        <VacancyAdditionalDetails data={data} />
        {!isAuth && (
          <div className="lg:hidden order-last w-full mt-6">
            <h4 className="text-xl font-semibold tracking-tight mb-3">
              {t('meInfo')}
            </h4>
            <JobVacancyRespond jobId={Number(id)} />
          </div>
        )}
      </div>
      <div className="mt-6 flex overflow-x-auto space-x-6">
        {candidateLoading && <p className="text-center mt-4"> {t('loading')}</p>}
        {candidateData?.map((resume) => (
          <div className="min-w-[200px]" key={resume.id}>
            <ResumeCard jobId={data.id} data={resume} inVacancy />
          </div>
        ))}
      </div>
    </>
  );
}

'use client';

import { hasCookie } from 'cookies-next';
import { useState } from 'react';
import { FiltrationJobs } from '@/widgets/job/ui';
import { JobCreate, JobSearch } from '@/features/job/ui';
import { JobCard } from '@/entities/job';
import { TGetJobsReqDto } from '@/entities/job/api';
import { useGetJobs } from '@/entities/job/hooks/useGetJobs';
import { useScopedI18n } from '@/shared/config';

export function Main() {
  const [filters, setFilters] = useState<TGetJobsReqDto>({});
  const [showFilters, setShowFilters] = useState(false);
  const t = useScopedI18n('base');
  const isAuth = hasCookie('authToken');

  const { data, isPending } = useGetJobs(filters);

  return (
    <div className="w-full px-4 mt-3 flex flex-col lg:flex-row justify-between gap-4">
      {/* Main Content Area */}
      <div className='flex-1 max-w-screen-lg'>
        <div className={'flex w-full flex-col lg:flex-row justify-between'}>
          <h1 className='text-3xl font-extrabold tracking-tight lg:text-5xl text-center'>
            {t('main.vacancies_count', { count: data?.length || 0 })}
          </h1>
          {isAuth && <JobCreate filters={filters} />}
        </div>
        <JobSearch setFilters={setFilters} filters={filters}/>
        <div className='mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {isPending && <p className='text-center mt-4'>{t('main.loading')}</p>}
          {data?.map((job) => (
            <JobCard key={job.id} data={job}/>
          ))}
        </div>
      </div>

      {/* Filter Section */}
      <div
        className={`fixed inset-0 bg-white p-6 transition-transform transform ${showFilters ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative lg:w-1/4 lg:max-w-xs right-0 z-20 shadow-lg lg:shadow-none rounded-lg overflow-y-auto max-h-screen`}
      >
        <div className="relative lg:sticky lg:top-0">
          <button
            className="lg:hidden absolute top-4 right-4 font-semibold text-gray-600"
            onClick={() => setShowFilters(false)}
          >
            {t('main.close')}
          </button>
          <FiltrationJobs setFilters={setFilters}/>
        </div>
      </div>

      {/* Mobile Filter Toggle Button */}
      {!showFilters && (
        <button
          className="lg:hidden fixed bottom-5 right-5 p-3 bg-blue-500 text-white rounded-full shadow-lg z-10"
          onClick={() => setShowFilters(true)}
        >
          {t('main.filters')}
        </button>
      )}
    </div>
  );
}

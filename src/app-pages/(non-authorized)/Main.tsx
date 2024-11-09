'use client';

import { useState } from 'react';
import { JobSearch } from '@/features/job/ui';
import { JobCard } from '@/entities/job';
import { TGetJobsReqDto } from '@/entities/job/api';
import { useGetJobs } from '@/entities/job/hooks/useGetJobs';

export function Main() {
  const [filters, setFilters] = useState<TGetJobsReqDto>({});

  const { data, isPending } = useGetJobs(filters);

  return (
    <div className="w-full items-center max-w-screen-lg px-4 mt-3">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
        Вакансии ({data?.length})
      </h1>
      <JobSearch
        setFilters={setFilters}
        filters={filters}
      />
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isPending && <p className='text-center mt-4'>Загрузка...</p>}
        {data?.map((job) => (
          <JobCard key={job.id} data={job}/>
        ))}
      </div>
    </div>
  );
}

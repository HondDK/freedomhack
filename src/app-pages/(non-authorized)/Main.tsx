'use client';

import { JobCard } from '@/entities/job';
import { useGetJobs } from '@/entities/job/hooks/useGetJobs';

export function Main() {
  const { data, isPending } = useGetJobs();

  if (isPending) {
    return <p className="text-center mt-4">Загрузка...</p>;
  }

  return (
    <div className="w-full items-center max-w-screen-lg px-4 mt-3">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
        Вакансии ({data?.length})
      </h1>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((job) => (
          <JobCard key={job.id} data={job} />
        ))}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useGetJobCandidates } from '@/entities/job-candidate/hooks/useGetJobCandidates';
import { TGetJobCandidatesReqDto } from '@/entities/job-candidate/api';
import { FiltrationResume } from '@/widgets/job-candidate/ui';
import { ResumeSearch, UploadResume } from '@/features/job-candidate/ui';
import { ResumeCard } from '@/entities/job-candidate/ui/ResumeCard/ResumeCard';

export function ResumePage() {
  const [filters, setFilters] = useState<TGetJobCandidatesReqDto>({});
  const { data, isPending } = useGetJobCandidates(filters)
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="w-full px-4 mt-3 flex flex-col lg:flex-row justify-between gap-4">
      <div className="flex-1 max-w-screen-lg">
        <div className={'flex w-full flex-col lg:flex-row justify-between'}>
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
            Резюме ({data?.length})
          </h1>
          <UploadResume filters={filters}/>
        </div>
          <ResumeSearch setFilters={setFilters} filters={filters}/>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isPending && <p className="text-center mt-4">Загрузка...</p>}
            {data?.map((resume) => (
              <ResumeCard key={resume.id} data={resume}/>
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
              Закрыть
            </button>
            <FiltrationResume setFilters={setFilters}/>
          </div>
        </div>
        {/* Mobile Filter Toggle Button */}
        {!showFilters && (
          <button
            className="lg:hidden fixed bottom-5 right-5 p-3 bg-blue-500 text-white rounded-full shadow-lg z-10"
            onClick={() => setShowFilters(true)}
          >
            Фильтры
          </button>
        )}
      </div>
      );
      }

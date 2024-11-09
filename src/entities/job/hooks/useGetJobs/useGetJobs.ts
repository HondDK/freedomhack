'use client'

import { useQuery } from '@tanstack/react-query';
import { TGetJobsResDto, TGetJobsReqDto, GET_JOBS } from '@/entities/job/api';
import { api } from '@/shared/api';

export function useGetJobs(filters: TGetJobsReqDto) {
  const { data, isError, isSuccess, isPending } = useQuery({
    queryKey: [GET_JOBS, filters],
    queryFn: () => api.query<TGetJobsResDto, TGetJobsReqDto>(GET_JOBS, { query: filters  }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { data, isError, isSuccess, isPending };
}

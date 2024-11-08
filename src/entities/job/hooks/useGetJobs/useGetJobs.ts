'use client'

import { useQuery } from '@tanstack/react-query';
import { TGetJobsResDto, GET_JOBS } from '@/entities/job/api';
import { api } from '@/shared/api';

export function useGetJobs() {
  const { data, isError, isSuccess, isPending } = useQuery({
    queryKey: [GET_JOBS],
    queryFn: () => api.query<TGetJobsResDto, void>(GET_JOBS),
  });

  return { data, isError, isSuccess, isPending };
}

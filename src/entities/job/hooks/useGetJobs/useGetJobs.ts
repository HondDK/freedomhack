'use client'

import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api';
import { GET_JOBS, TGetJobsResDto } from '@/entities/job/api';

export function useGetJobs() {
  const { data, isError, isSuccess, isPending } = useQuery({
    queryKey: [GET_JOBS],
    queryFn: () => api.query<TGetJobsResDto, void>(GET_JOBS),
  });

  return { data, isError, isSuccess, isPending };
}

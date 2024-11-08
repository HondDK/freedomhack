'use client'

import { useQuery } from '@tanstack/react-query';
import { TGetJobCandidatesResDto, GET_JOB_CANDIDATES } from '@/entities/job-candidate/api';
import { api } from '@/shared/api';

export function useGetJobCandidates() {
  const { data, isError, isSuccess, isPending } = useQuery({
    queryKey: [GET_JOB_CANDIDATES],
    queryFn: () => api.query<TGetJobCandidatesResDto, void>(GET_JOB_CANDIDATES),
  });

  return { data, isError, isSuccess, isPending };
}

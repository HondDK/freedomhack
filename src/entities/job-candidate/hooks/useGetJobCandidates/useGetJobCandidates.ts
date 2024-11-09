'use client'

import { useQuery } from '@tanstack/react-query';
import { TGetJobCandidatesResDto, TGetJobCandidatesReqDto, GET_JOB_CANDIDATES } from '@/entities/job-candidate/api';
import { api } from '@/shared/api';

export function useGetJobCandidates(filters: TGetJobCandidatesReqDto) {
  const { data, isError, isSuccess, isPending } = useQuery({
    queryKey: [GET_JOB_CANDIDATES, filters],
    queryFn: () => api.query<TGetJobCandidatesResDto, TGetJobCandidatesReqDto>(GET_JOB_CANDIDATES, { query: filters }),
  });

  return { data, isError, isSuccess, isPending };
}

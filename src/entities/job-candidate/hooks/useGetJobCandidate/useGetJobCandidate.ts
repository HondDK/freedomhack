'use client'

import { useQuery } from '@tanstack/react-query';
import { TGetJobCandidateReqDto, TGetJobCandidateResDto, GET_JOB_CANDIDATE } from '@/entities/job-candidate/api';
import { api } from '@/shared/api';

export function useGetJobCandidate(id: number) {
  const { data, isError, isSuccess, isPending } = useQuery({
    queryKey: [GET_JOB_CANDIDATE],
    queryFn: () => api.query<TGetJobCandidateResDto, TGetJobCandidateReqDto>(GET_JOB_CANDIDATE, { body: { id: id } }),
  });

  return { data, isError, isSuccess, isPending };
}

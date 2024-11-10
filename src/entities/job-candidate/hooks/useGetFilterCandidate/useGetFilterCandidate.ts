'use client'

import { useQuery } from '@tanstack/react-query';
import {
  TGetJobCandidatesResDto,
  TGetJobCandidatesReqDto,
  GET_FILTER_CANDIDATE
} from '@/entities/job-candidate/api';
import { api } from '@/shared/api';

export function useGetFilterCandidate(filters: TGetJobCandidatesReqDto, isAuth: boolean) {
  const { data, isError, isSuccess, isPending } = useQuery({
    queryKey: [GET_FILTER_CANDIDATE, filters],
    queryFn: () => api.query<TGetJobCandidatesResDto, TGetJobCandidatesReqDto>(GET_FILTER_CANDIDATE, { query: filters }),
    enabled: isAuth
  });

  return { data, isError, isSuccess, isPending };
}

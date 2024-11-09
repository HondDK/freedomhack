'use client'

import { useQuery } from '@tanstack/react-query';
import { TGetJobStatusResDto, GET_SEARCH_STATUS, TGetJobsReqDto } from '@/entities/job/api';
import { api } from '@/shared/api';

export function useGetSearchStatus() {
  const { data, isError, isSuccess, isPending } = useQuery({
    queryKey: [GET_SEARCH_STATUS],
    queryFn: () => api.query<TGetJobStatusResDto, void>(GET_SEARCH_STATUS),
  });

  return { data, isError, isSuccess, isPending };
}

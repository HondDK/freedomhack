'use client'

import { useQuery } from '@tanstack/react-query';
import { TGetJobReqDto, TGetJobResDto, GET_JOB } from '@/entities/job/api';
import { api } from '@/shared/api';

export function useGetJob(id: number) {
  const { data, isError, isSuccess, isPending } = useQuery({
    queryKey: [GET_JOB],
    queryFn: () => api.query<TGetJobResDto, TGetJobReqDto>(GET_JOB, { body: { id: id } }),
  });

  return { data, isError, isSuccess, isPending };
}

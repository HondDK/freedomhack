'use client'

import { useQuery } from '@tanstack/react-query';
import { TGetJobReqDto, TGetJobResDto, GET_JOB } from '@/entities/job/api';
import { api } from '@/shared/api';

export function useGetJob(id: number | undefined) {
  const { data, isError, isSuccess, isPending } = useQuery({
    queryKey: [GET_JOB, id],
    queryFn: () => api.query<TGetJobResDto, TGetJobReqDto>(GET_JOB, { params: { id: id! } }),
    enabled: !!id
  });

  return { data, isError, isSuccess, isPending };
}

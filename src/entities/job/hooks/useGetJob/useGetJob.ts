'use client'

import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api';
import { GET_JOB, TGetJobReqDto, TGetJobResDto } from '@/entities/job/api';

export function useGetJob(id: number) {
  const { data, isError, isSuccess, isPending } = useQuery({
    queryKey: [GET_JOB],
    queryFn: () => api.query<TGetJobResDto, TGetJobReqDto>(GET_JOB, {body: { id: id}}),
  });

  return { data, isError, isSuccess, isPending };
}

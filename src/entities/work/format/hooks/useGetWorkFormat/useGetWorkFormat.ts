'use client'

import { useQuery } from '@tanstack/react-query';
import { TGetWorkFormatResDto, GET_WORK_FORMAT } from '@/entities/work/format';
import { api } from '@/shared/api';

export function useGetWorkFormat() {
  const { data, isError, isSuccess, isPending } = useQuery({
    queryKey: [GET_WORK_FORMAT],
    queryFn: () => api.query<TGetWorkFormatResDto, void>(GET_WORK_FORMAT),
  });

  return { data, isError, isSuccess, isPending };
}

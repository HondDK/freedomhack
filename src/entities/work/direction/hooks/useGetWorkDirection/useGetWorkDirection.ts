'use client'

import { useQuery } from '@tanstack/react-query';
import { TGetWorkDirectionResDto, GET_WORK_DIRECTION } from '@/entities/work/direction';
import { api } from '@/shared/api';

export function useGetWorkDirection() {
  const { data, isError, isSuccess, isPending } = useQuery({
    queryKey: [GET_WORK_DIRECTION],
    queryFn: () => api.query<TGetWorkDirectionResDto, void>(GET_WORK_DIRECTION),
  });

  return { data, isError, isSuccess, isPending };
}

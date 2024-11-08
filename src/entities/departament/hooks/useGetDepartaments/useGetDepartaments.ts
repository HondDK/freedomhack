'use client'

import { useQuery } from '@tanstack/react-query';
import { TGetDepartamentsResDto, GET_DEPARTAMENTS } from '@/entities/departament/api';
import { api } from '@/shared/api';

export function useGetDepartaments() {
  const { data, isError, isSuccess, isPending } = useQuery({
    queryKey: [GET_DEPARTAMENTS],
    queryFn: () => api.query<TGetDepartamentsResDto, void>(GET_DEPARTAMENTS),
  });

  return { data, isError, isSuccess, isPending };
}

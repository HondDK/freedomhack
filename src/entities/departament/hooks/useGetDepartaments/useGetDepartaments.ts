'use client'

import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api';
import { GET_DEPARTAMENTS, TGetDepartamentsResDto } from '@/entities/departament/api';

export function useGetDepartaments() {
  const { data, isError, isSuccess, isPending } = useQuery({
    queryKey: [GET_DEPARTAMENTS],
    queryFn: () => api.query<TGetDepartamentsResDto, void>(GET_DEPARTAMENTS),
  });

  return { data, isError, isSuccess, isPending };
}

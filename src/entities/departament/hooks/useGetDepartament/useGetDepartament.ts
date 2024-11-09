'use client'

import { useQuery } from '@tanstack/react-query';
import { TGetDepartamentReqDto, TGetDepartamentResDto, GET_DEPARTAMENT } from '@/entities/departament/api';
import { api } from '@/shared/api';

export function useGetDepartament(id: number) {
  const { data, isError, isSuccess, isPending } = useQuery({
    queryKey: [GET_DEPARTAMENT],
    queryFn: () => api.query<TGetDepartamentResDto, TGetDepartamentReqDto>(GET_DEPARTAMENT, { params: { id: id } }),
  });

  return { data, isError, isSuccess, isPending };
}

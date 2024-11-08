'use client'

import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api';
import { GET_DEPARTAMENT, TGetDepartamentReqDto, TGetDepartamentResDto } from '@/entities/departament/api';

export function useGetDepartament(id: number) {
  const { data, isError, isSuccess, isPending } = useQuery({
    queryKey: [GET_DEPARTAMENT],
    queryFn: () => api.query<TGetDepartamentResDto, TGetDepartamentReqDto>(GET_DEPARTAMENT, {body: { id: id}}),
  });

  return { data, isError, isSuccess, isPending };
}

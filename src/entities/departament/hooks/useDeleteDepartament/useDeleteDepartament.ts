'use client'

import { useMutation } from '@tanstack/react-query';
import { TDeleteDepartamentReqDto, DELETE_DEPARTAMENT } from '@/entities/departament/api';
import { api } from '@/shared/api';

export function useDeleteDepartament() {
  const { mutate, data, isError, isSuccess, isPending } = useMutation({
        mutationFn: (variables: TDeleteDepartamentReqDto) => api.mutation<TDeleteDepartamentReqDto, void>(DELETE_DEPARTAMENT, {
          params: { id: Number(variables.id) },
        })(variables),
  });

  return { mutate, data, isError, isSuccess, isPending };
}

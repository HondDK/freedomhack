'use client'

import { useMutation } from '@tanstack/react-query';
import { api } from '@/shared/api';
import { DELETE_DEPARTAMENT, TDeleteDepartamentReqDto } from '@/entities/departament/api';

export function useDeleteDepartament() {
  const { mutate, data, isError, isSuccess, isPending } = useMutation({
    mutationFn: api.mutation<TDeleteDepartamentReqDto, void>(DELETE_DEPARTAMENT),
  });

  return { mutate, data, isError, isSuccess, isPending };
}

'use client'

import { useMutation } from '@tanstack/react-query';
import { api } from '@/shared/api';
import { CREATE_DEPARTAMENT, TCreateDepartamentReqDto, TCreateDepartamentResDto } from '@/entities/departament/api';

export function useCreateDepartament() {
  const { mutate, data, isError, isSuccess, isPending } = useMutation({
    mutationFn: api.mutation<TCreateDepartamentReqDto, TCreateDepartamentResDto>(CREATE_DEPARTAMENT),
  });

  return { mutate, data, isError, isSuccess, isPending };
}

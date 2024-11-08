'use client'

import { useMutation } from '@tanstack/react-query';
import { TCreateDepartamentReqDto, TCreateDepartamentResDto, CREATE_DEPARTAMENT } from '@/entities/departament/api';
import { api } from '@/shared/api';

export function useCreateDepartament() {
  const { mutate, data, isError, isSuccess, isPending } = useMutation({
    mutationFn: api.mutation<TCreateDepartamentReqDto, TCreateDepartamentResDto>(CREATE_DEPARTAMENT),
  });

  return { mutate, data, isError, isSuccess, isPending };
}

'use client'

import { useMutation } from '@tanstack/react-query';
import { TEditDepartamentReqDto, TEditDepartamentResDto, EDIT_DEPARTAMENT } from '@/entities/departament/api';
import { api } from '@/shared/api';

export function useEditDepartament() {
  const { mutate, data, isError, isSuccess, isPending } = useMutation({
    mutationFn: api.mutation<TEditDepartamentReqDto, TEditDepartamentResDto>(EDIT_DEPARTAMENT),
  });

  return { mutate, data, isError, isSuccess, isPending };
}

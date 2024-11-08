'use client'

import { useMutation } from '@tanstack/react-query';
import { api } from '@/shared/api';
import { EDIT_DEPARTAMENT, TEditDepartamentReqDto, TEditDepartamentResDto } from '@/entities/departament/api';

export function useEditDepartament() {
  const { mutate, data, isError, isSuccess, isPending } = useMutation({
    mutationFn: api.mutation<TEditDepartamentReqDto, TEditDepartamentResDto>(EDIT_DEPARTAMENT),
  });

  return { mutate, data, isError, isSuccess, isPending };
}

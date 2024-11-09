'use client'

import { useMutation } from '@tanstack/react-query';
import { TEditCompanyReqDto, TEditCompanyResDto, EDIT_COMPANY } from '@/entities/company/api';
import { TEditDepartamentReqDto, TEditDepartamentResDto, EDIT_DEPARTAMENT } from '@/entities/departament/api';
import { api } from '@/shared/api';

export function useEditDepartament() {
  const { mutate, data, isError, isSuccess, isPending } = useMutation({
    mutationFn: (variables: TEditDepartamentReqDto) =>
      api.mutation<TEditDepartamentReqDto, TEditDepartamentResDto>(EDIT_DEPARTAMENT, {
        params: { id: Number(variables.id) },
        body: variables
      })(variables),
  });

  return { mutate, data, isError, isSuccess, isPending };
}

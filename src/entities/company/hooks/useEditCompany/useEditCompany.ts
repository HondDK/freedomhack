'use client';

import { useMutation } from '@tanstack/react-query';
import { TEditCompanyReqDto, TEditCompanyResDto, EDIT_COMPANY } from '@/entities/company/api';
import { api } from '@/shared/api';

export function useEditCompany() {
  const { mutate, data, isError, isSuccess, isPending } = useMutation({
    mutationFn: (variables: TEditCompanyReqDto) =>
      api.mutation<TEditCompanyReqDto, TEditCompanyResDto>(EDIT_COMPANY, {
        params: { id: Number(variables.id) },
        body: variables
      })(variables),
  });

  return { mutate, data, isError, isSuccess, isPending };
}

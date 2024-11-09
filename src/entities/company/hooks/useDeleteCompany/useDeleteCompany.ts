'use client'

import { useMutation } from '@tanstack/react-query';
import {
  TDeleteCompanyReqDto,
  DELETE_COMPANY,
} from '@/entities/company/api';
import { api } from '@/shared/api';

export function useDeleteCompany() {
  const { mutate, data, isError, isSuccess, isPending } = useMutation({
    mutationFn: (variables: TDeleteCompanyReqDto) => api.mutation<TDeleteCompanyReqDto, void>(DELETE_COMPANY, {
      params: { id: Number(variables.id) },
    })(variables),
  });

  return { mutate, data, isError, isSuccess, isPending };
}

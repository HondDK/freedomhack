'use client'

import { useMutation } from '@tanstack/react-query';
import { TCreateCompaniesReqDto, CREATE_COMPANY } from '@/entities/company/api';
import { api } from '@/shared/api';

export function useCreateCompany() {
  const { mutate, data, isError, isSuccess, isPending } = useMutation({
    mutationFn: api.mutation<TCreateCompaniesReqDto, TCreateCompaniesReqDto>(CREATE_COMPANY),
  });

  return { mutate, data, isError, isSuccess, isPending };
}

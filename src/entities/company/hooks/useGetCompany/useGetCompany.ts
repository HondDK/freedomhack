'use client'

import { useQuery } from '@tanstack/react-query';
import { TGetCompanyReqDto, TGetCompanyResDto, GET_COMPANIES, GET_COMPANY } from '@/entities/company/api';
import { api } from '@/shared/api';

export function useGetCompany(id: number) {
  const { data, isError, isSuccess, isPending } = useQuery({
    queryKey: [GET_COMPANIES],
    queryFn: () => api.query<TGetCompanyResDto, TGetCompanyReqDto>(GET_COMPANY, { body: { id: id } }),
  });

  return { data, isError, isSuccess, isPending };
}

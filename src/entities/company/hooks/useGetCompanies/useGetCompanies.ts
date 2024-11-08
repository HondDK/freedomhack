'use client'

import { useQuery } from '@tanstack/react-query';
import { GET_COMPANIES, TGetCompaniesResDto } from '@/entities/company/api';
import { api } from '@/shared/api';

export function useGetCompanies() {
  const { data, isError, isSuccess, isPending } = useQuery({
    queryKey: [GET_COMPANIES],
    queryFn: () => api.query<TGetCompaniesResDto, void>(GET_COMPANIES),
  });

  return { data, isError, isSuccess, isPending };
}

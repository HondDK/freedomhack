'use client'

import { useQuery } from '@tanstack/react-query';
import { TGetCountryResDto, GET_COUNTRY } from '@/entities/location/api';
import { api } from '@/shared/api';

export function useGetCountry() {
  const { data, isError, isSuccess, isPending } = useQuery({
    queryKey: [GET_COUNTRY],
    queryFn: () => api.query<TGetCountryResDto, void>(GET_COUNTRY),
  });

  return { data, isError, isSuccess, isPending };
}

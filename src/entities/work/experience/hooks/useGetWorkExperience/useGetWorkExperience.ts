'use client'

import { useQuery } from '@tanstack/react-query';
import { TGetWorkExperienceResDto, GET_WORK_EXPERIENCE } from '@/entities/work/experience';
import { api } from '@/shared/api';

export function useGetWorkExperience() {
  const { data, isError, isSuccess, isPending } = useQuery({
    queryKey: [GET_WORK_EXPERIENCE],
    queryFn: () => api.query<TGetWorkExperienceResDto, void>(GET_WORK_EXPERIENCE),
  });

  return { data, isError, isSuccess, isPending };
}

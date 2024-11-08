'use client'

import { useQuery } from '@tanstack/react-query';
import { TGetSkillsResDto, GET_SKILLS } from '@/entities/skill/api';
import { api } from '@/shared/api';

export function useGetSkills() {
  const { data, isError, isSuccess, isPending } = useQuery({
    queryKey: [GET_SKILLS],
    queryFn: () => api.query<TGetSkillsResDto, void>(GET_SKILLS),
  });

  return { data, isError, isSuccess, isPending };
}

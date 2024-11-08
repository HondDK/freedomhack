'use client'

import { useMutation } from '@tanstack/react-query';
import { TDeleteJobReqDto, DELETE_JOB } from '@/entities/job/api';
import { api } from '@/shared/api';

export function useDeleteJob() {
  const { mutate, data, isError, isSuccess, isPending } = useMutation({
    mutationFn: api.mutation<TDeleteJobReqDto, void>(DELETE_JOB),
  });

  return { mutate, data, isError, isSuccess, isPending };
}

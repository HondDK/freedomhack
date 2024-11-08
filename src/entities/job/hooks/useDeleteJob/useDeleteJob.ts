'use client'

import { useMutation } from '@tanstack/react-query';
import { api } from '@/shared/api';
import { DELETE_JOB, TDeleteJobReqDto } from '@/entities/job/api';

export function useDeleteJob() {
  const { mutate, data, isError, isSuccess, isPending } = useMutation({
    mutationFn: api.mutation<TDeleteJobReqDto, void>(DELETE_JOB),
  });

  return { mutate, data, isError, isSuccess, isPending };
}

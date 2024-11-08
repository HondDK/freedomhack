'use client'

import { useMutation } from '@tanstack/react-query';
import { api } from '@/shared/api';
import { CREATE_JOB, TCreateJobReqDto, TCreateJobResDto } from '@/entities/job/api';

export function useCreateJob() {
  const { mutate, data, isError, isSuccess, isPending } = useMutation({
    mutationFn: api.mutation<TCreateJobReqDto, TCreateJobResDto>(CREATE_JOB),
  });

  return { mutate, data, isError, isSuccess, isPending };
}

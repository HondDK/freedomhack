'use client'

import { useMutation } from '@tanstack/react-query';
import { TCreateJobReqDto, TCreateJobResDto, CREATE_JOB } from '@/entities/job/api';
import { api } from '@/shared/api';

export function useCreateJob() {
  const { mutate, data, isError, isSuccess, isPending } = useMutation({
    mutationFn: api.mutation<TCreateJobReqDto, TCreateJobResDto>(CREATE_JOB),
  });

  return { mutate, data, isError, isSuccess, isPending };
}

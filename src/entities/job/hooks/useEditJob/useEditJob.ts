'use client'

import { useMutation } from '@tanstack/react-query';
import { TEditJobReqDto, TEditJobResDto, EDIT_JOB } from '@/entities/job/api';
import { api } from '@/shared/api';

export function useEditJob() {
  const { mutate, data, isError, isSuccess, isPending } = useMutation({
    mutationFn: api.mutation<TEditJobReqDto, TEditJobResDto>(EDIT_JOB),
  });

  return { mutate, data, isError, isSuccess, isPending };
}

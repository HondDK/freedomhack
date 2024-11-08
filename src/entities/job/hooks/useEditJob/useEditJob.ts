'use client'

import { useMutation } from '@tanstack/react-query';
import { api } from '@/shared/api';
import { EDIT_JOB, TEditJobReqDto, TEditJobResDto } from '@/entities/job/api';

export function useEditJob() {
  const { mutate, data, isError, isSuccess, isPending } = useMutation({
    mutationFn: api.mutation<TEditJobReqDto, TEditJobResDto>(EDIT_JOB),
  });

  return { mutate, data, isError, isSuccess, isPending };
}

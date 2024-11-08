'use client'

import { useMutation } from '@tanstack/react-query';
import {
  TCreateJobCandidateReqDto,
  TCreateJobCandidateResDto,
  CREATE_JOB_CANDIDATE
} from '@/entities/job-candidate/api';
import { api } from '@/shared/api';

export function useCreateJobCandidate() {
  const { mutate, data, isError, isSuccess, isPending } = useMutation({
    mutationFn: api.mutation<TCreateJobCandidateReqDto, TCreateJobCandidateResDto>(CREATE_JOB_CANDIDATE),
  });

  return { mutate, data, isError, isSuccess, isPending };
}

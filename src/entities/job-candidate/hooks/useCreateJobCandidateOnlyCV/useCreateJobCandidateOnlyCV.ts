'use client'

import { useMutation } from '@tanstack/react-query';
import { TCreateJobCandidateOnlyCVReqDto, CREATE_JOB_CANDIDATE_ONLY_CV } from '@/entities/job-candidate/api';
import { api } from '@/shared/api';

export function useCreateJobCandidateOnlyCV() {
  const { mutate, data, isError, isSuccess, isPending } = useMutation({
    mutationFn: api.mutation<TCreateJobCandidateOnlyCVReqDto, void>(CREATE_JOB_CANDIDATE_ONLY_CV),
  });

  return { mutate, data, isError, isSuccess, isPending };
}

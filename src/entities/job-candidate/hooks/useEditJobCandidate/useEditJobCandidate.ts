'use client'

import { useMutation } from '@tanstack/react-query';
import { TEditJobCandidateReqDto, TEditJobCandidateResDto, EDIT_JOB_CANDIDATE } from '@/entities/job-candidate/api';
import { api } from '@/shared/api';

export function useEditJobCandidate() {
  const { mutate, data, isError, isSuccess, isPending } = useMutation({
    mutationFn: api.mutation<TEditJobCandidateReqDto, TEditJobCandidateResDto>(EDIT_JOB_CANDIDATE),
  });

  return { mutate, data, isError, isSuccess, isPending };
}

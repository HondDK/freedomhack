'use client'

import { useMutation } from '@tanstack/react-query';
import { TDeleteJobCandidateReqDto, DELETE_JOB_CANDIDATE } from '@/entities/job-candidate/api';
import { api } from '@/shared/api';

export function useDeleteJobCandidate() {
  const { mutate, data, isError, isSuccess, isPending } = useMutation({
    mutationFn: api.mutation<TDeleteJobCandidateReqDto, void>(DELETE_JOB_CANDIDATE),
  });

  return { mutate, data, isError, isSuccess, isPending };
}

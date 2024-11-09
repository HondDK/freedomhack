'use client'

import { useMutation } from '@tanstack/react-query';
import {
  TCompareJobCandidateResDto,
  TCompareJobCandidateReqDto,
  COMPARE_JOB_CANDIDATE
} from '@/entities/company/api';
import { api } from '@/shared/api';

export function useCompareJobCandidate() {
  const { mutate, data, isError, isSuccess, isPending } = useMutation({
    mutationFn: api.mutation<TCompareJobCandidateReqDto, TCompareJobCandidateResDto>(COMPARE_JOB_CANDIDATE),
  });

  return { mutate, data, isError, isSuccess, isPending };
}

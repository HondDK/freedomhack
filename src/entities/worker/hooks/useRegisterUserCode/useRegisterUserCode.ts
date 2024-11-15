'use client';


import { useMutation } from '@tanstack/react-query';
import { TRegisterUserCodeReqDto, TRegisterUserCodeResDto, REGISTER_CONFIRM } from '@/entities/worker';
import { api } from '@/shared/api';

export function useRegisterUserCode(uuid: string) {
  const { mutate, data, isError, isSuccess, isPending } = useMutation({
    mutationFn: api.mutation<TRegisterUserCodeReqDto, TRegisterUserCodeResDto>(REGISTER_CONFIRM, { params: { uuid } }),
  });

  return { mutate, data, isError, isPending, isSuccess }
}

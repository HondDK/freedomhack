'use client'

import { useMutation } from '@tanstack/react-query';
import { setCookie } from 'cookies-next';
import { TAuthUserReqDto, TAuthUserResDto, SIGN_IN } from '@/entities/worker/api';
import { api } from '@/shared/api';

export function useAuthUser() {
  const { mutate, data, isError, isSuccess, isPending } = useMutation({
    mutationFn: api.mutation<TAuthUserReqDto, TAuthUserResDto>(SIGN_IN),
    onSuccess: data => {
      setCookie('authToken', data.access);
    },
  });

  return { mutate, data, isError, isSuccess, isPending };
}

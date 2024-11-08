import { useMutation } from '@tanstack/react-query';
import { SIGN_IN, TAuthUserReqDto, TAuthUserResDto } from '@/entities/worker/api';
import { setCookie } from 'cookies-next/src/client';
import { api } from '@/shared/api';

export function useAuthUser() {
  const { mutate, data, isError, isSuccess, isPending } = useMutation({
    mutationFn: api.mutation<TAuthUserReqDto, TAuthUserResDto>(SIGN_IN),
    onSuccess: data => {
      setCookie('authToken', data.accessToken);
    },
  });

  return { mutate, data, isError, isSuccess, isPending };
}

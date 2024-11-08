import { useMutation } from '@tanstack/react-query';
import { TRegisterUserInitReqDto, TRegisterUserInitResDto, REGISTER_INIT } from '@/entities/worker';
import { api } from '@/shared/api';

export function useRegisterUserInit() {
  const { mutate, data, isError, isSuccess, isPending } = useMutation({
    mutationFn: api.mutation<TRegisterUserInitReqDto, TRegisterUserInitResDto>(REGISTER_INIT),
  });
  return { mutate, data, isError, isSuccess, isPending };
}

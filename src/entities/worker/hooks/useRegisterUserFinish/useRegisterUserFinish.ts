import { useMutation } from '@tanstack/react-query';
import {
  TRegisterUserFinishReqDto,
  TRegisterUserFinishResDto,
  REGISTER_FINISH
} from '@/entities/worker';
import { api } from '@/shared/api';

export function useRegisterUserFinish(uuid: string) {
  const { mutate, data, isError, isSuccess, isPending } = useMutation({
    mutationFn: api.mutation<TRegisterUserFinishReqDto, TRegisterUserFinishResDto>(REGISTER_FINISH, { params: { uuid } }),
  });

  return { mutate, data, isError, isSuccess, isPending };
}

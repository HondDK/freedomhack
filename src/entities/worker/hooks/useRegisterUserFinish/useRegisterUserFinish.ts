import { api } from '@/shared/api';
import {
	REGISTER_FINISH,
	TRegisterUserFinishReqDto,
	TRegisterUserFinishResDto
} from '@/entities/worker';
import { useMutation } from '@tanstack/react-query';

export function useRegisterUserFinish(uuid: string) {
	const { mutate, data, isError, isSuccess, isPending } = useMutation({
		mutationFn: api.mutation<TRegisterUserFinishReqDto, TRegisterUserFinishResDto>(REGISTER_FINISH, { params: { uuid }}),
	});

	return { mutate, data, isError, isSuccess, isPending };
}

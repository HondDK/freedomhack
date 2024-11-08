import { api } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';
import { REGISTER_INIT, TRegisterUserInitReqDto, TRegisterUserInitResDto } from '@/entities/worker';

export function useRegisterUserInit() {
	const { mutate, data, isError, isSuccess, isPending } = useMutation({
		mutationFn: api.mutation<TRegisterUserInitReqDto, TRegisterUserInitResDto>(REGISTER_INIT),
	});

	return { mutate, data, isError, isSuccess, isPending };
}

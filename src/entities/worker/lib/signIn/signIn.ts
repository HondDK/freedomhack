import { sharedStore } from '@/shared/store';
import { TAuthUserResDto } from '@/entities/user/api';

export default async function signIn(response: TAuthUserResDto) {
	const mainToken = response.access;
	const refreshToken = response.refresh

	sharedStore.setAuthData({
		mainToken,
		refreshToken
	});
}
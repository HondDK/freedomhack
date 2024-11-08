export type TAuthUserResDto = {
	refresh: string,
	access: string
}

export type TAuthUserReqDto = {
	username: string,
	password: string
}

export type TRegisterUserInitResDto = {
	uuid: string,
	status: number
}

export type TRegisterUserInitReqDto = {
	email: string,
	tg_username: string,
	full_name: string,
}

export type TRegisterUserCodeResDto = void

export type TRegisterUserCodeReqDto = {
	code: string
}

export type TRegisterUserFinishResDto = void

export type TRegisterUserFinishReqDto = {
	password: string
}
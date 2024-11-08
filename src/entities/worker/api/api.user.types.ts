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
	name: string,
	address: string,
	phone_number: string
}

export type TRegisterUserCodeResDto = void

export type TRegisterUserCodeReqDto = {
	code: string
}

export type TRegisterUserFinishResDto = void

export type TRegisterUserFinishReqDto = {
	password: string
}
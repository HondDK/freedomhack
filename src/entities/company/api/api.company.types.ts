
interface ICompanyModel {
  creator?: number,
  name?: string,
  logo?: string
  id?: number,
}

export type TGetCompaniesResDto = ICompanyModel[]

export type TCreateCompaniesReqDto = {
  name: string
}
export type TCreateCompaniesResDto = ICompanyModel

export type TGetCompanyReqDto = {
  id: number
}

export type TGetCompanyResDto = ICompanyModel

export type TEditCompanyReqDto = ICompanyModel

export type TEditCompanyResDto = ICompanyModel

export type TDeleteCompanyReqDto = {
  id: number
}


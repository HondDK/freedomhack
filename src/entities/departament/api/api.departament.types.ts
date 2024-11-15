
interface IDepartamentModel {
  company: {
    id: number,
    name: string,
    creator: number,
    logo: string
  }
  name: string,
  id: number,
}

export type TGetDepartamentsResDto = IDepartamentModel[]

export type TCreateDepartamentReqDto = {
  name: string,
  company: number
}
export type TCreateDepartamentResDto = IDepartamentModel

export type TGetDepartamentReqDto = {
  id: number
}

export type TGetDepartamentResDto = IDepartamentModel

export type TEditDepartamentReqDto = {
  id: number,
  name: string,
  company: number
}

export type TEditDepartamentResDto = IDepartamentModel

export type TDeleteDepartamentReqDto = {
  id: number
}


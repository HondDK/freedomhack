

export interface IJobCandidateModel {
  sub_work_directions: SubWorkDirection;
  work_direction: WorkDirection;
  phone_number?: string;
  countries: number[];
  full_name?: string;
  cv_file?: string;
  skills: Skill[];
  cities: City[];
  email?: string;
  job?: number;
  id: number;
}

interface WorkDirection {
  name_kz: string;
  name_ru: string;
  name_en: string;
  id: number;
}

interface SubWorkDirection {
  name_kz: string;
  name_ru: string;
  name_en: string;
  id: number;
}

interface Skill {
  name_kz: string;
  name_ru: string;
  name_en: string;
  id: number;
}

interface Company {
  creator: Creator;
  logo?: string;
  name: string;
  id: number;
}

interface Creator {
  name: string;
  id: number;
}


interface Country {
  name_kz: string;
  name_ru: string;
  name_en: string;
  cities: City[];
  id: number;
}

interface City {
  country: Country;
  name_kz: string;
  name_ru: string;
  name_en: string;
  id: number;
}

export type TGetJobCandidatesResDto = IJobCandidateModel[]

export type TGetJobCandidatesReqDto = {
  job?: string,
  work_direction?: number[],
  sub_work_directions?: number[],
  skills?: number[],
  countries?: number[],
  cities?: number[]
  search?: string
}

export type TCreateJobCandidateReqDto = {
  job?: number,
  full_name?: string,
  email?: string,
  phone_number?: string
  cv_file?: string
}

export type TCreateJobCandidateResDto = IJobCandidateModel

export type TCreateJobCandidateOnlyCVReqDto = File

export type TGetJobCandidateReqDto = {
  id: number
}

export type TGetJobCandidateResDto = IJobCandidateModel

export type TEditJobCandidateReqDto = {
  full_name?: string;
  email?: string;
  phone_number?: string;
  job?: number;
  work_direction: number[];
  sub_work_directions: number[];
  skills: number[];
  countries: number[];
  cities: number[];
}

export type TEditJobCandidateResDto = IJobCandidateModel

export type TDeleteJobCandidateReqDto = {
  id: number
}


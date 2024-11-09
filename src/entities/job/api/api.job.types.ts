
export interface IJobModel {
  sub_work_direction: SubWorkDirection;
  job_search_status: JobSearchStatus;
  work_experience: WorkExperience;
  work_direction: WorkDirection;
  work_format: WorkFormat;
  description_kz?: string;
  description_ru?: string;
  description_en?: string;
  department: Department;
  company: Company;
  country: Country;
  modified: string;
  skills: Skill[];
  created: string;
  name_kz: string;
  name_ru: string;
  name_en: string;
  creator: number;
  title: string;
  id: number;
  city: City;
}

interface WorkFormat {
  name_kz: string;
  name_ru: string;
  name_en: string;
  id: number;
}

interface WorkExperience {
  name_kz: string;
  name_ru: string;
  name_en: string;
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

interface Department {
  company: Company;
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

interface JobSearchStatus {
  name: string;
  id: number;
}


export type TGetJobsResDto = IJobModel[]

export type TCreateJobReqDto = {
  id: number;
  name_kz: string;
  name_ru: string;
  name_en: string;
  description_kz?: string;
  description_ru?: string;
  description_en?: string;
  requirements_kz: string;
  requirements_ru: string;
  requirements_en: string;
  work_format?: number;
  work_experience?: number;
  work_direction?: number;
  sub_work_direction?: number;
  company: number;
  department?: number;
  job_search_status?: number;
  country?: number;
  city?: number;
  skills: number[];
  created: string;
  modified: string;
  creator: number;
}
export type TCreateJobResDto = IJobModel

export type TGetJobReqDto = {
  id: number
}

export type TGetJobResDto = IJobModel

export type TEditJobReqDto = TCreateJobReqDto

export type TEditJobResDto = IJobModel

export type TDeleteJobReqDto = {
  id: number
}

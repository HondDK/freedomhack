
interface IJobModel {
  id: number;
  title: string;
  work_format: WorkFormat;
  work_experience: WorkExperience;
  work_direction: WorkDirection;
  sub_work_direction: SubWorkDirection;
  skills: Skill[];
  company: Company;
  department: Department;
  country: Country;
  city: City;
  job_search_status: JobSearchStatus;
  created: string;
  modified: string;
  name_kz: string;
  name_ru: string;
  name_en: string;
  description_kz?: string;
  description_ru?: string;
  description_en?: string;
  creator: number;
}

interface WorkFormat {
  id: number;
  name_kz: string;
  name_ru: string;
  name_en: string;
}

interface WorkExperience {
  id: number;
  name_kz: string;
  name_ru: string;
  name_en: string;
}

interface WorkDirection {
  id: number;
  name_kz: string;
  name_ru: string;
  name_en: string;
}

interface SubWorkDirection {
  id: number;
  name_kz: string;
  name_ru: string;
  name_en: string;
}

interface Skill {
  id: number;
  name_kz: string;
  name_ru: string;
  name_en: string;
}

interface Company {
  id: number;
  name: string;
  creator: Creator;
  logo?: string;
}

interface Creator {
  id: number;
  name: string;
}

interface Department {
  id: number;
  name: string;
  company: Company;
}

interface Country {
  id: number;
  cities: City[];
  name_kz: string;
  name_ru: string;
  name_en: string;
}

interface City {
  id: number;
  name_kz: string;
  name_ru: string;
  name_en: string;
  country: Country;
}

interface JobSearchStatus {
  id: number;
  name: string;
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




interface IJobCandidateModel {
  sub_work_directions: number[];
  work_direction: number[];
  phone_number?: string;
  countries: number[];
  full_name?: string;
  cv_file?: string;
  skills: number[];
  cities: number[];
  email?: string;
  job?: number;
  id: number;
}

export type TGetJobCandidatesResDto = IJobCandidateModel[]

export type TCreateJobCandidateReqDto = {
  job: number,
  full_name: string,
  email: string,
  phone_number: string
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


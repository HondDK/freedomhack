import { TEndpoint } from '@/shared/api/api.types';

export const GET_COMPANIES : TEndpoint = {
  method: 'GET',
  path: 'company/company/'
}

export const CREATE_COMPANY : TEndpoint = {
  method: 'POST',
  path: 'company/company/'
}

export const GET_COMPANY: TEndpoint = {
  method: 'GET',
  path: 'company/company/{{id}}/'
}

export const EDIT_COMPANY: TEndpoint = {
  method: 'PATCH',
  path: 'company/company/{{id}}/'
}

export const DELETE_COMPANY: TEndpoint = {
  method: 'DELETE',
  path: 'company/company/{{id}}/'
}

export const COMPARE_JOB_CANDIDATE : TEndpoint = {
  method: 'POST',
  path: 'job/job/compare-job-candidate/'
}
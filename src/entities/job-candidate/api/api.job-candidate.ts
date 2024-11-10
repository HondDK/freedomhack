import { TEndpoint } from '@/shared/api/api.types';

export const GET_JOB_CANDIDATES : TEndpoint = {
  method: 'GET',
  path: 'job-candidate/job-candidate/'
}

export const GET_FILTER_CANDIDATE: TEndpoint = {
  method: 'GET',
  path: 'job-candidate/job-candidate/filter-candidates/'
}

export const CREATE_JOB_CANDIDATE : TEndpoint = {
  method: 'POST',
  path: 'job-candidate/create-job-candidate/'
}

export const CREATE_JOB_CANDIDATE_ONLY_CV : TEndpoint = {
  method: 'POST',
  path: 'job-candidate/create-job-candidate-only-cv/'
}

export const GET_JOB_CANDIDATE: TEndpoint = {
  method: 'GET',
  path: 'job-candidate/job-candidate/{{id}}/'
}

export const EDIT_JOB_CANDIDATE: TEndpoint = {
  method: 'PATCH',
  path: 'job-candidate/job-candidate/{{id}}/'
}

export const DELETE_JOB_CANDIDATE: TEndpoint = {
  method: 'DELETE',
  path: 'job-candidate/job-candidate/{{id}}/'
}
import { TEndpoint } from '@/shared/api/api.types';

export const GET_JOBS : TEndpoint = {
  method: 'GET',
  path: 'job/job/'
}

export const CREATE_JOB : TEndpoint = {
  method: 'POST',
  path: 'job/job/'
}

export const GET_JOB: TEndpoint = {
  method: 'GET',
  path: 'job/job/{{id}}/'
}

export const EDIT_JOB: TEndpoint = {
  method: 'PATCH',
  path: 'job/job/{{id}}/'
}

export const DELETE_JOB: TEndpoint = {
  method: 'DELETE',
  path: 'job/job/{{id}}/'
}

export const GET_SEARCH_STATUS : TEndpoint = {
  method: 'GET',
  path: 'job/job-search-status/'
}
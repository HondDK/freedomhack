import { TEndpoint } from '@/shared/api/api.types';

export const GET_COMPANIES : TEndpoint = {
  method: 'GET',
  path: 'departament/departament/'
}

export const CREATE_COMPANY : TEndpoint = {
  method: 'POST',
  path: 'departament/departament/'
}

export const GET_COMPANY: TEndpoint = {
  method: 'GET',
  path: 'departament/departament/{{id}}/'
}

export const EDIT_COMPANY: TEndpoint = {
  method: 'PATCH',
  path: 'departament/departament/{{id}}/'
}

export const DELETE_COMPANY: TEndpoint = {
  method: 'DELETE',
  path: 'departament/departament/{{id}}/'
}
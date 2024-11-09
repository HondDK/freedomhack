import { TEndpoint } from '@/shared/api/api.types';

export const GET_DEPARTAMENTS : TEndpoint = {
  method: 'GET',
  path: 'departament/departament/'
}

export const CREATE_DEPARTAMENT : TEndpoint = {
  method: 'POST',
  path: 'departament/departament/'
}

export const GET_DEPARTAMENT: TEndpoint = {
  method: 'GET',
  path: 'departament/departament/{{id}}/'
}

export const EDIT_DEPARTAMENT: TEndpoint = {
  method: 'PATCH',
  path: 'departament/departament/{{id}}/'
}

export const DELETE_DEPARTAMENT: TEndpoint = {
  method: 'DELETE',
  path: 'departament/departament/{{id}}/'
}
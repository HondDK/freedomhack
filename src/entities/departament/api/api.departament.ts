import { TEndpoint } from '@/shared/api/api.types';

export const GET_DEPARTAMENTS : TEndpoint = {
  method: 'GET',
  path: 'department/department/'
}

export const CREATE_DEPARTAMENT : TEndpoint = {
  method: 'POST',
  path: 'department/department/'
}

export const GET_DEPARTAMENT: TEndpoint = {
  method: 'GET',
  path: 'department/department/{{id}}/'
}

export const EDIT_DEPARTAMENT: TEndpoint = {
  method: 'PATCH',
  path: 'department/department/{{id}}/'
}

export const DELETE_DEPARTAMENT: TEndpoint = {
  method: 'DELETE',
  path: 'department/department/{{id}}/'
}
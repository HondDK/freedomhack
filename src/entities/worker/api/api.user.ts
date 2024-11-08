import { TEndpoint } from '@/shared/api/api.types';

export const SIGN_IN: TEndpoint = {
  method: 'POST',
  path: 'token/'
}

export const REGISTER_INIT: TEndpoint = {
  method: 'POST',
  host: 'default',
  path: 'registration/registration/init/'
}

export const REGISTER_CONFIRM: TEndpoint = {
  method: 'POST',
  host: 'default',
  path: `registration/registration/{{uuid}}/confirm_email/`
}

export const REGISTER_FINISH: TEndpoint = {
  method: 'POST',
  host: 'default',
  path: `registration/registration/{{uuid}}/finish/`
}
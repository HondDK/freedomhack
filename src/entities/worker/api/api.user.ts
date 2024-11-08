import { TEndpoint } from '@/shared/api/api.types';

export const SIGN_IN: TEndpoint = {
  method: 'POST',
  endpoint: 'token/'
}

export const REGISTER_INIT: TEndpoint = {
  method: 'POST',
  host: 'default',
  endpoint: 'registration/registration/init/'
}

export const REGISTER_CONFIRM: TEndpoint = {
  method: 'POST',
  host: 'default',
  endpoint: `registration/registration/{{uuid}}/confirm_email/`
}

export const REGISTER_FINISH: TEndpoint = {
  method: 'POST',
  host: 'default',
  endpoint: `registration/registration/{{uuid}}/finish/`
}
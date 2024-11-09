import axios from 'axios';
import { getCookie } from 'cookies-next';
import type { TEndpoint, TPayload } from './api.types';
import { createQueryString, replaceTemplate } from './api.utils';

const HOST = 'https://dudeonthecam.online/freedom_back/api/';

type ApiRequestFunction<TParams = void, TResult = unknown> = (payload?: TParams) => Promise<TResult>;

interface ApiInterface {
  mutation: <Req, TResult>(endpoint: TEndpoint, payload?: TPayload<Req>) => ApiRequestFunction<Req, TResult>;
  query: <TResult, TParams = void>(endpoint: TEndpoint, payload?: TPayload<TParams>) => Promise<TResult>;
}

export const api: ApiInterface = {
  query: async <TResult, TParams = void>(
    endpoint: TEndpoint,
    payload: TPayload<TParams> = {}
  ): Promise<TResult> => {
    const { path, method } = endpoint;
    const { query, params, body } = payload;

    const token = getCookie('authToken');
    const url = HOST + replaceTemplate(path, params ?? {}) + (query ? createQueryString(query) : '');

    const response = await axios({
      url,
      method,
      data: body,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        'Content-Type': 'application/json',
      }
    },);

    return response.data
  },
  mutation: <Req, TResult>(
    endpoint: TEndpoint,
    payload: TPayload<Req> = {}
  ) => {
    const { path, method } = endpoint;
    const { query, params } = payload;

    return async (data: Req | undefined) => {
      const token = getCookie('authToken');
      const url = HOST + replaceTemplate(path, params ?? {}) + (query ? createQueryString(query) : '');
      const response = await axios({
        url,
        method,
        data,
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
          'Content-Type': 'application/json',
        },
      });

      return response.data as TResult;
    };
  },
};


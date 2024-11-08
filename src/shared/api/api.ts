import { getCookie } from 'cookies-next/src/client';
import type { TEndpoint, TPayload } from './api.types';
import { createQueryString, replaceTemplate } from './api.utils';
import axios from 'axios';

const HOST = '';

type ApiRequestFunction<TParams = void, TResult = unknown> = (payload?: TParams) => Promise<TResult>;

interface ApiInterface {
  query: <TResult, TParams = void>(endpoint: TEndpoint, payload?: TPayload<TParams>) => Promise<TResult>;
  mutation: <Req, TResult>(endpoint: TEndpoint, payload?: TPayload<Req>) => ApiRequestFunction<Req, TResult>;
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

    const response = await fetch(url, {
      method,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.json() as TResult;
  },

  mutation: <Req, TResult>(
    endpoint: TEndpoint,
    payload: TPayload<Req> = {}
  ): ApiRequestFunction<Req, TResult> => {
    const { path, method } = endpoint;
    const { query, params } = payload;

    return async (data: Req) => {
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


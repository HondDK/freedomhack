import { getCookie } from 'cookies-next';
import type { TEndpoint, TPayload } from './api.types';
import { createQueryString, replaceTemplate } from './api.utils';
import axios from 'axios';

const HOST = process.env.NEXT_PUBLIC_HOST;

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
  ) => {
    const { path, method } = endpoint;
    const { query, params } = payload;

    return async (data: Req | undefined) => {
      console.log(data);
      const token = getCookie('authToken');
      console.log(HOST);
      const url = HOST + replaceTemplate(path, params ?? {}) + (query ? createQueryString(query) : '');
      console.log(url);
      const response = await axios({
        url,
        method,
        data,
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
          'Content-Type': 'application/json',
        },
      });
      console.log(response);

      return response.data as TResult;
    };
  },
};


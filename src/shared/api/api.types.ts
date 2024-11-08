
export type TMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export type TEndpoint = {
  method: TMethod;
  path: string;
  host?: string;
};

export type TPayload<T = undefined> = {
  query?: Record<string, string | number | null>;
  params?: Record<string, string | number | null>;
  body?: T;
};

export type TKernelHostErr = {
  message: string;
  statusCode: number;
};

export type TMutateRes<Res, Req = unknown> = [
  (payload: Req) => void,
  {
    data: undefined | Res;
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
  },
];

export type TQueryRes<Res> = {
  data: undefined | Res;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
};

export type TQueryListRes<Res, Req = unknown> = [
  (payload: Req) => void,
  {
    data: Res | undefined;
    isPending: boolean;
    isFetching: boolean;
    isSuccess: boolean;
    isError: boolean;
    limit: number;
    totalPages: undefined | number;
    count: undefined | number;
  },
];

export type TListRes<T> = {
  count: number;
  rows: T[];
};

export type TMutateReq<Res = undefined> = {
  invalidate?: boolean;
  onSuccess?: (data: Res) => void;
};

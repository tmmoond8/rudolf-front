import type { AxiosResponse } from 'axios';
import useOriginSWR, { SWRConfiguration } from 'swr';
import { request } from './config';

const fetcher = (url: string) => {
  return request
    .get(url)
    .then((res) => res.data)
    .catch((d) => console.log('d', d));
};

export const useSWR = <T>(url: string, option?: SWRConfiguration) => {
  return useOriginSWR<AxiosResponse<T>>(url, {
    ...option,
    fetcher,
  });
};

interface ResponseLogin {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: 'local';
  };
}

const auth = {
  login: (identifier: string, password: string) =>
    request
      .post('/api/auth/local', {
        identifier,
        password,
      })
      .then((res) => res.data as ResponseLogin),
};

export default {
  auth,
};

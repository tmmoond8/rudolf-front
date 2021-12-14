import type { AxiosResponse } from 'axios';
import useOriginSWR, { SWRConfiguration } from 'swr';
import { request } from './config';
import type { ResponseLogin, WordBook } from '../types/model';

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

const auth = {
  login: (identifier: string, password: string) =>
    request
      .post('/api/auth/local', {
        identifier,
        password,
      })
      .then((res) => res.data as ResponseLogin),
};

const wordNote = {
  post: (data: Partial<WordBook['attributes']>) =>
    request
      .post('/api/words-notes', {
        data,
      })
      .then((res) => res.data as any),
};

export default {
  auth,
  wordNote,
};

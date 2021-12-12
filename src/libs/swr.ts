import axios, { AxiosResponse } from 'axios';
import useOriginSWR, { SWRConfiguration } from 'swr';
const instance = axios.create({
  baseURL: 'http://localhost:1337',
});

const fetcher = (url: string) => instance.get(url).then((res) => res.data);

export const useSWR = <T>(url: string, option?: SWRConfiguration) => {
  return useOriginSWR<AxiosResponse<T>>(url, {
    ...option,
    fetcher,
  });
};

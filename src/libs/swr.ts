import axios, { AxiosResponse } from 'axios';
import useOriginSWR, { SWRConfiguration } from 'swr';
const instance = axios.create({
  baseURL: 'http://localhost:1337',
});

instance.interceptors.response.use((response) => {
  const {
    data: { data },
  } = response;

  if (Array.isArray(data)) {
    data.forEach((d) => replaceParsedContents(d));
  } else {
    replaceParsedContents(data);
  }

  return response;
});

const fetcher = (url: string) => {
  console.log('url', url);
  return instance
    .get(url)
    .then((res) => {
      console.log('res', res.data);
      return res.data;
    })
    .catch((d) => console.log('d', d));
};

export const useSWR = <T>(url: string, option?: SWRConfiguration) => {
  return useOriginSWR<AxiosResponse<T>>(url, {
    ...option,
    fetcher,
  });
};

function replaceParsedContents(data: {
  id: number;
  attributes: Record<string, any>;
}) {
  const { id, attributes } = data;
  if (attributes && 'contents' in attributes) {
    try {
      attributes.contents = JSON.parse(attributes.contents);
    } catch (error) {
      console.info('JSON parse failed');
    }
  }
}

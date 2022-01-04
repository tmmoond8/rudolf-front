import axios from 'axios';
import localStorage from '../libs/localStorage';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use((request) => {
  const { headers } = request;
  const token = localStorage.getToken();
  if (headers && token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return request;
});

instance.interceptors.response.use((response) => {
  const {
    data: { data },
    config: { url },
  } = response;

  if (url?.match(/^\/api\/words-notes/)) {
    if (Array.isArray(data)) {
      data.forEach((d) => replaceParsedContents(d));
    } else {
      replaceParsedContents(data);
    }
  }

  return response;
});

export const request = instance;

function replaceParsedContents(data: {
  id: number;
  attributes: Record<string, any>;
}) {
  const { attributes } = data;
  if (attributes && 'contents' in attributes) {
    try {
      attributes.contents = JSON.parse(attributes.contents);
    } catch (error) {
      console.info('JSON parse failed');
    }
  }
}

import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://localhost:1337',
});

instance.interceptors.request.use((request) => {
  const { headers } = request;
  if (headers) {
    headers['Authorization'] =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM5MzExMzM2LCJleHAiOjE2NDE5MDMzMzZ9.8GEHrFpuvljwqQcjAQ6Y2VCfkgdM1__CJaboBG0ssyg';
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

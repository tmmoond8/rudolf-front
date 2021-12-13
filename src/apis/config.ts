import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://localhost:1337',
});

instance.interceptors.response.use((response, ...a) => {
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

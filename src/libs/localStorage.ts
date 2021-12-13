const STORAGE_KEYS = {
  RUDOLF_TOKEN: 'RUDOLF_TOKEN',
} as const;

const localStorage = globalThis?.localStorage;

const storage = {
  getToken: () => {
    if (!localStorage) return null;
    return localStorage.getItem(STORAGE_KEYS.RUDOLF_TOKEN);
  },
  setToken: (token: string) => {
    if (!localStorage) return null;
    localStorage.setItem(STORAGE_KEYS.RUDOLF_TOKEN, token);
  },
};

export default storage;

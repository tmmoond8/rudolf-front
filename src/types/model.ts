export interface WordBook {
  id: number;
  attributes: {
    coverImage: string;
    title: string;
    description: string;
    createdAt: string;
    contents: { word: string; description: string }[] | string;
  };
}

export interface ResponseLogin {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: 'local';
  };
}

export interface User {
  id: number;
  provider: 'local';
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

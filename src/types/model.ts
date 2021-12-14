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

import type { Matrix } from 'react-spreadsheet';
export interface ArrResponse<T> {
  data: ARR<T>;
  meta: { page: number; pageSize: number; pageCount: number; total: number };
}

export type ARR<T> = {
  id: number;
  attributes: T;
}[];

export interface STR<T> {
  data: {
    id: number;
    attributes: T;
  };
}

export interface WordBook {
  coverImage: string;
  title: string;
  description: string;
  createdAt: string;
  contents: { word: string; description: string }[];
  author?: STR<User>;
  tags?: ArrResponse<{ tag: string }>;
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

export interface Cell {
  value: string;
}

export type SpreadsheetData = Matrix<Cell>;

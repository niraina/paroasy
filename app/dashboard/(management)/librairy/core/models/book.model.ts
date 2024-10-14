import { Librairy } from "./librairy.model";

export type BookModel = {
  data: Book[];
  success: boolean;
  totalItems?: number;
  page: number;
  itemsPerPage: number;
  totalPages?: number;
  currentPage: number;
};

export type Book = {
  id?: number;
  title: string;
  author: string;
  librairyId: number;
  librairy: Librairy;
};

export type RequestBook = {
  page: number;
  itemsPerPage: number;
  name?: string;
};

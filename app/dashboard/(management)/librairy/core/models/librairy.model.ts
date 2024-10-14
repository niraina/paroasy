import { Book } from "./book.model";
import { ResponsableLibrairy } from "./responsable.model";

export type LibrairyModel = {
  data: Librairy[];
  success: boolean;
  totalItems?: number;
  page: number;
  itemsPerPage: number;
  totalPages?: number;
  currentPage: number;
};

export type Librairy = {
  id: number;
  name: string;
  book: Book[];
  responsable?: ResponsableLibrairy[];
};

export type RequestLibrairy = {
  page: number;
  itemsPerPage: number;
  name?: string;
};

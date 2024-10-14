import { Librairy } from "./librairy.model";

export type ResponsableLibrairyModel = {
  data: ResponsableLibrairy[];
  success: boolean;
  totalItems?: number;
  page: number;
  itemsPerPage: number;
  totalPages?: number;
  currentPage: number;
};

export type ResponsableLibrairy = {
  id?: number;
  fullName: string;
  poste: string;
  thumbnail: string;
  tel: number | string;
  librairyId: number;
  librairy: Librairy;
};

export type RequestResponsableLibrairy = {
  page: number;
  itemsPerPage: number;
  name?: string;
};

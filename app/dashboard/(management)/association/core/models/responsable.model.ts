import { Homonorie } from "./homonorie.model";

export type ResponsableHomonorieModel = {
  data: ResponsableHomonorie[];
  success: boolean;
  totalItems?: number;
  page: number;
  itemsPerPage: number;
  totalPages?: number;
  currentPage: number;
};

export type ResponsableHomonorie = {
  id?: number;
  fullName: string;
  poste: string;
  thumbnail: string;
  tel: number | string;
  homonorieId: number;
  homonorie: Homonorie;
};

export type RequestResponsableHomonorie = {
  page: number;
  itemsPerPage: number;
  name?: string;
  district?: number;
  region?: string;
};

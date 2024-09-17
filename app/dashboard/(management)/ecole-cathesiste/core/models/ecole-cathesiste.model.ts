import { Eglise } from "../../../eglise/core/models/eglise.model";
import { Preast } from "../../../preast/core/models/preast.model";

export type EcoleCathesisteModel = {
  data: EcoleCathesiste[];
  success: boolean;
  totalItems?: number;
  page: number;
  itemsPerPage: number;
  totalPages?: number;
  currentPage: number;
};

export type EcoleCathesiste = {
  id?: number;
  name: string;
  egliseId: number;
  preastId: number;
  eglise: Eglise;
  preast: Preast;
};

export type RequestEcoleCathesiste = {
  page: number;
  itemsPerPage: number;
  name?: string;
};

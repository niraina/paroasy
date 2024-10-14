import { EcoleCathesiste } from "../../../ecole-cathesiste/core/models/ecole-cathesiste.model";
import { Eglise } from "../../../eglise/core/models/eglise.model";
import { Preast } from "../../../preast/core/models/preast.model";

export type EleveCathesisteModel = {
  data: EleveCathesiste[];
  success: boolean;
  totalItems?: number;
  page: number;
  itemsPerPage: number;
  totalPages?: number;
  currentPage: number;
};

export type EleveCathesiste = {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  intergationDate: string;
  ecoleId: number;
  ecole: EcoleCathesiste;
  endDate?: string;
};

export type RequestEleveCathesiste = {
  page: number;
  itemsPerPage: number;
  name?: string;
};
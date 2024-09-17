import { Eglise } from "../../../eglise/core/models/eglise.model";

export type PreastModel = {
  data: Preast[];
  success: boolean;
  totalItems?: number;
  page: number;
  itemsPerPage: number;
  totalPages?: number;
  currentPage: number;
};

export type Preast = {
  id: number;
  firstName: string;
  lastName: string;
  about: string;
  status: string;
  thumbnail: string;
  birthDate: string;
  egliseId: number;
  eglise?: Eglise;
};

export type RequestPreast = {
  page: number;
  itemsPerPage: number;
  firstName?: string;
  district?: number;
  region?: string;
};

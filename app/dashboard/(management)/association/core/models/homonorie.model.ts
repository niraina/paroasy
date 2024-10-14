import { Eglise } from "../../../eglise/core/models/eglise.model";
import { Responsable } from "../../../etablisement/core/models/responsable.model";

export type HomonorieModel = {
  data: Homonorie[];
  success: boolean;
  totalItems?: number;
  page: number;
  itemsPerPage: number;
  totalPages?: number;
  currentPage: number;
};

export type Homonorie = {
  id: number;
  name: string;
  membre: number;
  nbZoky: number;
  nbZandry: number;
  egliseId: number;
  eglise: Eglise;
  responsable?: Responsable[];
};

export type RequestHomonorie = {
  page: number;
  itemsPerPage: number;
  name?: string;
};

import { Etablisement } from "./etablisement.model";

export type ResponsableModel = {
  data: Responsable[];
  success: boolean;
  totalItems?: number;
  page: number;
  itemsPerPage: number;
  totalPages?: number;
  currentPage: number;
};

export type Responsable = {
  id?: number;
  fullName: string;
  poste: string;
  thumbnail: string;
  etablisementId: string;
  etablisement: Etablisement;
  tel: number | string;
};

export type RequestResponsable = {
  page: number;
  itemsPerPage: number;
  name?: string;
  district?: number;
  region?: string;
};

import { Responsable } from "../../../etablisement/core/models/responsable.model";

export type SanteModel = {
  data: Sante[];
  success: boolean;
  totalItems?: number;
  page: number;
  itemsPerPage: number;
  totalPages?: number;
  currentPage: number;
};

export type Sante = {
  id: number;
  nomMaladie: string;
  personne: string;
  creationDate: string;
  region: string;
  district: string;
  egliseId: number;
  congregation: string;
  responsable?: Responsable;
};

export type RequestSante = {
  page: number;
  itemsPerPage: number;
  name?: string;
};

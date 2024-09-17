import { Responsable } from "./responsable.model";

export type EtablisementModel = {
  data: Etablisement[];
  success: boolean;
  totalItems?: number;
  page: number;
  itemsPerPage: number;
  totalPages?: number;
  currentPage: number;
};

export type Etablisement = {
  id?: number;
  name: string;
  region: string;
  district: string;
  diocese: string;
  nbEleve: number;
  nbCepe: number;
  nbBepc: number;
  nbBacc: number;
  resultCepe: number;
  resultBepc: number;
  resultBacc: number;
  schoolYear: string;
  responsable?: Responsable[];
};

export type RequestEtablisement = {
  page: number;
  itemsPerPage: number;
  name?: string;
  district?: number;
  region?: string;
};

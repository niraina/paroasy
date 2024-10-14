import { EleveCathesiste } from "../../../eleve-cathesiste/core/models/eleve-cathesiste.model";

export type FormationModel = {
  data: Formation[];
  success: boolean;
  totalItems?: number;
  page: number;
  itemsPerPage: number;
  totalPages?: number;
  currentPage: number;
};

export type Formation = {
  id: number;
  label: string;
  eleveId: number;
  eleve: EleveCathesiste;
};

export type RequestFormation = {
  page: number;
  itemsPerPage: number;
  label?: string;
};

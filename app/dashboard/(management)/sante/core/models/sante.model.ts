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
};

export type RequestSante = {
  page: number;
  itemsPerPage: number;
  name?: string;
};

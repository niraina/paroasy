export type EgliseModel = {
  data: Eglise[];
  success: boolean;
  totalItems?: number;
  page: number;
  itemsPerPage: number;
  totalPages?: number;
  currentPage: number;
};

export type Eglise = {
  id?: number;
  name: string;
  district: string;
  region: string | null;
  creationDate?: string;
};

export type RequestEglise = {
  page: number;
  itemsPerPage: number;
  name?: string;
  district?: number;
  region?: string;
};

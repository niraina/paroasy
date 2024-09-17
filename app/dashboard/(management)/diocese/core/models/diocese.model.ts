export type DioceseModel = {
  data: DioceseInterface[];
  success: boolean;
  totalItems?: number;
  page: number;
  itemsPerPage: number;
  totalPages?: number;
  currentPage: number;
};

export type DioceseInterface = {
  id: number;
  name: string;
  district: string;
  region: string;
  creationDate: string;
};

export type RequestDiocese = {
  page: number;
  itemsPerPage: number;
  name?: string;
};

export type PageDioceseModel = {
  data: PageDiocese[];
  success: boolean;
  totalItems?: number;
  page: number;
  itemsPerPage: number;
  totalPages?: number;
  currentPage: number;
};

export type PageDiocese = {
  id: number;
  content: string;
};

export type RequestPageDiocese = {
  page: number;
  itemsPerPage: number;
  title?: string;
  pageNumber?: number;
};

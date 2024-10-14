export type DailyModel = {
  data: Daily[];
  success: boolean;
  totalItems?: number;
  page: number;
  itemsPerPage: number;
  totalPages?: number;
  currentPage: number;
};

export type Daily = {
  id: number;
  reference: string;
  content: string;
  creationDate: string;
};

export type RequestDaily = {
  page: number;
  itemsPerPage: number;
  title?: string;
  pageNumber?: number;
};

export type RadioModel = {
  data: Radio[];
  success: boolean;
  totalItems?: number;
  page: number;
  itemsPerPage: number;
  totalPages?: number;
  currentPage: number;
};

export type Radio = {
  id: number;
  content: string;
};

export type RequestRadio = {
  page: number;
  itemsPerPage: number;
};

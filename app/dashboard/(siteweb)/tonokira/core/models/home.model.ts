export type TonokiraModel = {
  data: Tonokira[];
  success: boolean;
  totalItems?: number;
  page: number;
  itemsPerPage: number;
  totalPages?: number;
  currentPage: number;
};

export type Tonokira = {
  id: number;
  title: string;
  content: string;
  isPublic: boolean;
  tumbnail: string;
  page?: number;
  type?: string;
};

export type RequestTonokira = {
  page: number;
  itemsPerPage: number;
  title?: string;
  pageNumber?: number;
};

export type InterfaceTonokira = {
  id: number;
  title: string;
  content: string;
  isPublic: boolean;
  tumbnail: string;
  page?: number;
  type?: string;
};

export type PersonelModel = {
  data: Personel[];
  success: boolean;
  totalItems?: number;
  page: number;
  itemsPerPage: number;
  totalPages?: number;
  currentPage: number;
};

export type Personel = {
  id: number;
  fullName: string;
  poste: string;
  tel: string;
  thumbnail: string;
};

export type RequestPersonel = {
  page: number;
  itemsPerPage: number;
  name?: string;
};

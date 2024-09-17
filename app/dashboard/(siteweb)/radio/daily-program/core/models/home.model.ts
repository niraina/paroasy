export type DailyProgramModel = {
  data: DailyProgram[];
  success: boolean;
  totalItems?: number;
  page: number;
  itemsPerPage: number;
  totalPages?: number;
  currentPage: number;
};

export type DailyProgram = {
  id: number;
  content: string;
  creationDate: string;
};

export type RequestDailyProgram = {
  page: number;
  itemsPerPage: number;
};

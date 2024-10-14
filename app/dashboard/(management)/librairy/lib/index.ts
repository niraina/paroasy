import { useAppSelector } from "@/app/store/hooks/app.hooks";

export const useResponseDataLibrairy = () =>
  useAppSelector((state) => state.librairy.response.data || []);
export const useRequestLibrairy = () =>
  useAppSelector((state) => state.librairy.request);
export const useLoadingLibrairy = (): boolean =>
  useAppSelector((state) => state.librairy.isLoading);
export const useResponseLibrairyData = () =>
  useAppSelector((state) => state.librairy);

export const useResponseDataLibrairyResponsable = () =>
  useAppSelector((state) => state.librairy_responsable.response.data || []);
export const useRequestLibrairyResponsable = () =>
  useAppSelector((state) => state.librairy_responsable.request);
export const useLoadingLibrairyResponsable = (): boolean =>
  useAppSelector((state) => state.librairy_responsable.isLoading);
export const useResponseLibrairyResponsableData = () =>
  useAppSelector((state) => state.librairy_responsable);

export const useResponseDataBook = () =>
  useAppSelector((state) => state.book.response.data || []);
export const useRequestBook = () =>
  useAppSelector((state) => state.book.request);
export const useLoadingBook = (): boolean =>
  useAppSelector((state) => state.book.isLoading);
export const useResponseBookData = () => useAppSelector((state) => state.book);

import { useAppSelector } from "@/app/store/hooks/app.hooks";

export const useResponseDataPageDiocese = () =>
  useAppSelector((state) => state.pageDiocese.response.data || []);
export const useRequestPageDiocese = () =>
  useAppSelector((state) => state.pageDiocese.request);
export const useLoadingPageDiocese = (): boolean =>
  useAppSelector((state) => state.pageDiocese.isLoading);
export const useResponsePageDioceseData = () =>
  useAppSelector((state) => state.pageDiocese);

import { useAppSelector } from "@/app/store/hooks/app.hooks";

export const useResponseDataPreast = () =>
  useAppSelector((state) => state.preast.response.data || []);
export const useRequestPreast = () =>
  useAppSelector((state) => state.preast.request);
export const useLoadingPreast = (): boolean =>
  useAppSelector((state) => state.preast.isLoading);
export const useResponsePreastData = () =>
  useAppSelector((state) => state.preast);

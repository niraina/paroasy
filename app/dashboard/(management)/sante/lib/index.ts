import { useAppSelector } from "@/app/store/hooks/app.hooks";

export const useResponseDataSante = () =>
  useAppSelector((state) => state.sante.response.data || []);
export const useRequestSante = () =>
  useAppSelector((state) => state.sante.request);
export const useLoadingSante = (): boolean =>
  useAppSelector((state) => state.sante.isLoading);
export const useResponseSanteData = () =>
  useAppSelector((state) => state.sante);

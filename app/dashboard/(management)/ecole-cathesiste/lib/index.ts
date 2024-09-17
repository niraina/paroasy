import { useAppSelector } from "@/app/store/hooks/app.hooks";

export const useResponseDataEcoleCathesiste = () =>
  useAppSelector((state) => state.ecoleCathesiste.response.data || []);
export const useRequestEcoleCathesiste = () =>
  useAppSelector((state) => state.ecoleCathesiste.request);
export const useLoadingEcoleCathesiste = (): boolean =>
  useAppSelector((state) => state.ecoleCathesiste.isLoading);
export const useResponseEcoleCathesisteData = () =>
  useAppSelector((state) => state.ecoleCathesiste);

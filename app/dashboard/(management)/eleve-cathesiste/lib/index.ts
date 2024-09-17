import { useAppSelector } from "@/app/store/hooks/app.hooks";

export const useResponseDataEleveCathesiste = () =>
  useAppSelector((state) => state.eleveCathesiste.response.data || []);
export const useRequestEleveCathesiste = () =>
  useAppSelector((state) => state.eleveCathesiste.request);
export const useLoadingEleveCathesiste = (): boolean =>
  useAppSelector((state) => state.eleveCathesiste.isLoading);
export const useResponseEleveCathesisteData = () =>
  useAppSelector((state) => state.eleveCathesiste);

import { useAppSelector } from "@/app/store/hooks/app.hooks";

export const useResponseDataTonokira = () =>
  useAppSelector((state) => state.tonokira.response.data || []);
export const useRequestTonokira = () =>
  useAppSelector((state) => state.tonokira.request);
export const useLoadingTonokira = (): boolean =>
  useAppSelector((state) => state.tonokira.isLoading);
export const useResponseTonokiraData = () =>
  useAppSelector((state) => state.tonokira);

import { useAppSelector } from "@/app/store/hooks/app.hooks";

export const useResponseDataEtablisement = () =>
  useAppSelector((state) => state.etablisement.response.data || []);
export const useRequestEtablisement = () =>
  useAppSelector((state) => state.etablisement.request);
export const useLoadingEtablisement = (): boolean =>
  useAppSelector((state) => state.etablisement.isLoading);
export const useResponseEtablisementData = () =>
  useAppSelector((state) => state.etablisement);

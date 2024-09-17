import { useAppSelector } from "@/app/store/hooks/app.hooks";

export const useResponseDataPersonel = () =>
  useAppSelector((state) => state.personel.response.data || []);
export const useRequestPersonel = () =>
  useAppSelector((state) => state.personel.request);
export const useLoadingPersonel = (): boolean =>
  useAppSelector((state) => state.personel.isLoading);
export const useResponsePersonelData = () =>
  useAppSelector((state) => state.personel);

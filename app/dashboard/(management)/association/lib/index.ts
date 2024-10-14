import { useAppSelector } from "@/app/store/hooks/app.hooks";

export const useResponseDataHomonorie = () =>
  useAppSelector((state) => state.homonorie.response.data || []);
export const useRequestHomonorie = () =>
  useAppSelector((state) => state.homonorie.request);
export const useLoadingHomonorie = (): boolean =>
  useAppSelector((state) => state.homonorie.isLoading);
export const useResponseHomonorieData = () =>
  useAppSelector((state) => state.homonorie);

export const useResponseDataHomonorieResponsable = () =>
  useAppSelector((state) => state.homonorie_responsable.response.data || []);
export const useRequestHomonorieResponsable = () =>
  useAppSelector((state) => state.homonorie_responsable.request);
export const useLoadingHomonorieResponsable = (): boolean =>
  useAppSelector((state) => state.homonorie_responsable.isLoading);
export const useResponseHomonorieResponsableData = () =>
  useAppSelector((state) => state.homonorie_responsable);

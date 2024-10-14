import { useAppSelector } from "@/app/store/hooks/app.hooks";

export const useResponseDataFormation = () =>
  useAppSelector((state) => state.formation.response.data || []);
export const useRequestFormation = () =>
  useAppSelector((state) => state.formation.request);
export const useLoadingFormation = (): boolean =>
  useAppSelector((state) => state.formation.isLoading);
export const useResponseFormationData = () =>
  useAppSelector((state) => state.formation);

import { useAppSelector } from "@/app/store/hooks/app.hooks";

export const useResponseDataEglise = () =>
  useAppSelector((state) => state.eglise.response.data || []);
export const useRequestEglise = () =>
  useAppSelector((state) => state.eglise.request);
export const useLoadingEglise = (): boolean =>
  useAppSelector((state) => state.eglise.isLoading);
export const useResponseEgliseData = () =>
  useAppSelector((state) => state.eglise);

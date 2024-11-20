import { useAppSelector } from "@/app/store/hooks/app.hooks";

export const useResponseDataRadio = () =>
  useAppSelector((state) => state.radio.response.data || []);
export const useRequestRadio = () =>
  useAppSelector((state) => state.radio.request);
export const useLoadingRadio = (): boolean =>
  useAppSelector((state) => state.radio.isLoading);
export const useResponseRadioData = () =>
  useAppSelector((state) => state.radio);

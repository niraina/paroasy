import { useAppSelector } from "@/app/store/hooks/app.hooks";

export const useResponseDataTonokiraDaily = () =>
  useAppSelector((state) => state.tonokira_daily.response.data || []);
export const useRequestTonokiraDaily = () =>
  useAppSelector((state) => state.tonokira_daily.request);
export const useLoadingTonokiraDaily = (): boolean =>
  useAppSelector((state) => state.tonokira_daily.isLoading);
export const useResponseTonokiraDailyData = () =>
  useAppSelector((state) => state.tonokira_daily);

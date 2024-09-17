import { useAppSelector } from "@/app/store/hooks/app.hooks";

export const useResponseDataDailyProgram = () =>
  useAppSelector((state) => state.dailyProgram.response.data || []);
export const useRequestDailyProgram = () =>
  useAppSelector((state) => state.dailyProgram.request);
export const useLoadingDailyProgram = (): boolean =>
  useAppSelector((state) => state.dailyProgram.isLoading);
export const useResponseDailyProgramData = () =>
  useAppSelector((state) => state.dailyProgram);

import { useAppSelector } from "@/app/store/hooks/app.hooks"

export const useResponseDataHome = () =>  useAppSelector((state) => state.home.response.data || [])
export const useRequestHome = () =>  useAppSelector((state) => state.home.request)
export const useLoadingHome = (): boolean =>  useAppSelector((state) => state.home.isLoading)
export const useResponseHomeData = () =>  useAppSelector((state) => state.home)
import { useAppSelector } from "@/app/store/hooks/app.hooks"

export const useResponseDataDiocese = () =>  useAppSelector((state) => state.diocese.response.data || [])
export const useRequestDiocese = () =>  useAppSelector((state) => state.diocese.request)
export const useLoadingDiocese = (): boolean =>  useAppSelector((state) => state.diocese.isLoading)
export const useResponseDioceseData = () =>  useAppSelector((state) => state.diocese)
import { useAppSelector } from "@/app/store/hooks/app.hooks"

export const useResponseDataArticle = () =>  useAppSelector((state) => state.articles.response.data || [])
export const useRequestArticle = () =>  useAppSelector((state) => state.articles.request)
export const useLoadingArticle = (): boolean =>  useAppSelector((state) => state.articles.isLoading)
export const useResponseArticleData = () =>  useAppSelector((state) => state.articles)
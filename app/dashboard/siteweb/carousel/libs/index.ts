import { useAppSelector } from "@/app/store/hooks/app.hooks"

export const useResponseDataCarousel = () =>  useAppSelector((state) => state.carousel.response.data || [])
export const useLoadingCarousel = (): boolean =>  useAppSelector((state) => state.carousel.isLoading)
export const useResponseCarouselData = () =>  useAppSelector((state) => state.carousel)
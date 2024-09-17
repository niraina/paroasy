import api from "@/app/shared/api/ApiHelper"
import { AxiosResponse } from "axios"

export const getAllCarousel = ():Promise<any> => {
    return api.get("/api/carousel").then((response: AxiosResponse<any>) => response).catch((error) => error)
}
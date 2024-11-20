import api from "@/app/shared/api/ApiHelper";
import { AxiosResponse } from "axios";

const DEL_URI = "/api/post";

export const deleteArticle = (id: number | any): Promise<any> => {
  return api
    .delete(`${DEL_URI}?id=${id}`)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};
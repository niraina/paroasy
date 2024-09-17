import api from "@/app/shared/api/ApiHelper";
import { AxiosResponse } from "axios";

const POST_URI = "/api/eleve-cathesiste";

export const postEleveCathesiste = (data: any): Promise<any> => {
  return api
    .post(POST_URI, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const putEleveCathesiste = (id: number, data: any): Promise<any> => {
  return api
    .put(`${POST_URI}?id=${id}`, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

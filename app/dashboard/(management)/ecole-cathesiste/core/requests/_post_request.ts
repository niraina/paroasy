import api from "@/app/shared/api/ApiHelper";
import { AxiosResponse } from "axios";

const POST_URI = "/api/ecole-cathesiste";

export const postEcoleCathesiste = (data: any): Promise<any> => {
  return api
    .post(POST_URI, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const putEcoleCathesiste = (id: number, data: any): Promise<any> => {
  return api
    .put(`${POST_URI}?id=${id}`, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

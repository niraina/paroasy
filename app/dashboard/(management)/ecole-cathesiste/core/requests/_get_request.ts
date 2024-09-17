import api from "@/app/shared/api/ApiHelper";
import { AxiosResponse } from "axios";
const URI = "/api/ecole-cathesiste";

export const getAllEcoleCathesiste = (data: any): Promise<any> => {
  return api
    .get(URI, {
      params: { ...data },
    })
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const getEcoleCathesiste = (id: number): Promise<any> => {
  return api
    .get(`${URI}?id=${id}`)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

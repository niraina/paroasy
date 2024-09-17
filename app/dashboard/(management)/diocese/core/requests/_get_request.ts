import api from "@/app/shared/api/ApiHelper";
import { AxiosResponse } from "axios";
const URI = "/api/diocese";

export const getAllDiocese = (data: any): Promise<any> => {
  return api
    .get(URI, {
      params: { ...data },
    })
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const getDiocese = (id: string): Promise<any> => {
  return api
    .get(`${URI}/${id}`)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

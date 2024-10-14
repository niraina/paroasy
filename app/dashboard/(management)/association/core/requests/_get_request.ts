import api from "@/app/shared/api/ApiHelper";
import { AxiosResponse } from "axios";
export const ASSOCIATION_URI = "/api/association";
export const ASSOCIATION_RESPONSABLE = "/api/association/responsable";

export const getAllHomonorie = (data: any): Promise<any> => {
  return api
    .get(ASSOCIATION_URI, {
      params: { ...data },
    })
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const getHomoronie = (id: number): Promise<any> => {
  return api
    .get(`${ASSOCIATION_URI}?id=${id}`)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const getAllHomonorieResponsable = (data: any): Promise<any> => {
  return api
    .get(ASSOCIATION_RESPONSABLE, {
      params: { ...data },
    })
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const getHomoronieResponsable = (id: number): Promise<any> => {
  return api
    .get(`${ASSOCIATION_RESPONSABLE}?id=${id}`)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

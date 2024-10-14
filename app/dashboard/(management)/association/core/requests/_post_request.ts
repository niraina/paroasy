import api from "@/app/shared/api/ApiHelper";
import { AxiosResponse } from "axios";
import { ASSOCIATION_RESPONSABLE, ASSOCIATION_URI } from "./_get_request";

export const postHomonorie = (data: any): Promise<any> => {
  return api
    .post(ASSOCIATION_URI, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const putHomonorie = (id: number, data: any): Promise<any> => {
  return api
    .put(`${ASSOCIATION_URI}?id=${id}`, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const postHomonorieResponsable = (data: any): Promise<any> => {
  return api
    .post(ASSOCIATION_RESPONSABLE, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const putHomonorieResponsable = (
  id: number,
  data: any
): Promise<any> => {
  return api
    .put(`${ASSOCIATION_RESPONSABLE}?id=${id}`, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

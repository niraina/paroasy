import api from "@/app/shared/api/ApiHelper";
import { AxiosResponse } from "axios";
import { ASSOCIATION_RESPONSABLE, ASSOCIATION_URI, BOOK } from "./_get_request";

export const postLibrairy = (data: any): Promise<any> => {
  return api
    .post(ASSOCIATION_URI, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const putLibrairy = (id: number, data: any): Promise<any> => {
  return api
    .put(`${ASSOCIATION_URI}?id=${id}`, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const postLibrairyResponsable = (data: any): Promise<any> => {
  return api
    .post(ASSOCIATION_RESPONSABLE, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const putLibrairyResponsable = (id: number, data: any): Promise<any> => {
  return api
    .put(`${ASSOCIATION_RESPONSABLE}?id=${id}`, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const postBook = (data: any): Promise<any> => {
  return api
    .post(BOOK, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const putBook = (id: number, data: any): Promise<any> => {
  return api
    .put(`${BOOK}?id=${id}`, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

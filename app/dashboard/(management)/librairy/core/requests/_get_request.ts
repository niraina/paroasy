import api from "@/app/shared/api/ApiHelper";
import { AxiosResponse } from "axios";
export const ASSOCIATION_URI = "/api/librairy";
export const ASSOCIATION_RESPONSABLE = "/api/librairy/responsable";
export const BOOK = "/api/librairy/book";

export const getAllLibrairy = (data: any): Promise<any> => {
  return api
    .get(ASSOCIATION_URI, {
      params: { ...data },
    })
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const getLibrairy = (id: number): Promise<any> => {
  return api
    .get(`${ASSOCIATION_URI}?id=${id}`)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const getAllLibrairyResponsable = (data: any): Promise<any> => {
  return api
    .get(ASSOCIATION_RESPONSABLE, {
      params: { ...data },
    })
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const getLibrairyResponsable = (id: number): Promise<any> => {
  return api
    .get(`${ASSOCIATION_RESPONSABLE}?id=${id}`)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const getAllBook = (data: any): Promise<any> => {
  return api
    .get(BOOK, {
      params: { ...data },
    })
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const getBook = (id: number): Promise<any> => {
  return api
    .get(`${BOOK}?id=${id}`)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

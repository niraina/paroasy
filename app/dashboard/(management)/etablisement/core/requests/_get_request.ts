import api from "@/app/shared/api/ApiHelper";
import { AxiosResponse } from "axios";
const URI = "/api/etablisement";
export const URI_RESPONSABLE = "/api/responsable-etablisement";

export const getAllEtablisement = (data: any): Promise<any> => {
  return api
    .get(URI, {
      params: { ...data },
    })
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const getEtablisement = (id: number): Promise<any> => {
  return api
    .get(`${URI}?id=${id}`)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const getAllResponsable = (data: any): Promise<any> => {
  return api
    .get(URI_RESPONSABLE, {
      params: { ...data },
    })
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const getResponsable = (id: number): Promise<any> => {
  return api
    .get(`${URI_RESPONSABLE}?id=${id}`)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

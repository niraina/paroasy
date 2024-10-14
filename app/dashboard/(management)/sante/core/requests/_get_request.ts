import api from "@/app/shared/api/ApiHelper";
import { AxiosResponse } from "axios";
const URI = "/api/sante";
export const RESPONSABLE = "/api/sante/responsable";

export const getAllSante = (data: any): Promise<any> => {
  return api
    .get(URI, {
      params: { ...data },
    })
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const getSante = (id: number): Promise<any> => {
  return api
    .get(`${URI}?id=${id}`)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const getAllSanteResponsable = (data: any): Promise<any> => {
  return api
    .get(RESPONSABLE, {
      params: { ...data },
    })
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const getSanteResponsable = (id: number): Promise<any> => {
  return api
    .get(`${RESPONSABLE}?id=${id}`)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

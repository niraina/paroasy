import api from "@/app/shared/api/ApiHelper";
import { AxiosResponse } from "axios";
import { RESPONSABLE } from "./_get_request";

const POST_URI = "/api/sante";

export const postSante = (data: any): Promise<any> => {
  return api
    .post(POST_URI, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const putSante = (id: number, data: any): Promise<any> => {
  return api
    .put(`${POST_URI}?id=${id}`, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const postSanteResponsable = (data: any): Promise<any> => {
  return api
    .post(RESPONSABLE, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const putSanteResponsable = (id: number, data: any): Promise<any> => {
  return api
    .put(`${RESPONSABLE}?id=${id}`, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

import api from "@/app/shared/api/ApiHelper";
import { AxiosResponse } from "axios";
import { URI_RESPONSABLE } from "./_get_request";

const POST_URI = "/api/etablisement";

export const postEtablisement = (data: any): Promise<any> => {
  return api
    .post(POST_URI, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const putEtablisement = (id: number, data: any): Promise<any> => {
  return api
    .put(`${POST_URI}?id=${id}`, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const postResponsable = (data: any): Promise<any> => {
  return api
    .post(URI_RESPONSABLE, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const putResponsable = (id: number, data: any): Promise<any> => {
  return api
    .put(`${URI_RESPONSABLE}?id=${id}`, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

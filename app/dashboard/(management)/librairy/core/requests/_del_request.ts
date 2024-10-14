import api from "@/app/shared/api/ApiHelper";
import { AxiosResponse } from "axios";
import { ASSOCIATION_RESPONSABLE, ASSOCIATION_URI, BOOK } from "./_get_request";

export const deleteLibrairy = (id: number | any): Promise<any> => {
  return api
    .delete(`${ASSOCIATION_URI}?id=${id}`)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const deleteLibrairyResponsable = (id: number | any): Promise<any> => {
  return api
    .delete(`${ASSOCIATION_RESPONSABLE}?id=${id}`)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const deleteBook = (id: number | any): Promise<any> => {
  return api
    .delete(`${BOOK}?id=${id}`)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

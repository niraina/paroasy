import api from "@/app/shared/api/ApiHelper";
import { AxiosResponse } from "axios";
import { ASSOCIATION_RESPONSABLE, ASSOCIATION_URI } from "./_get_request";

export const deleteHomonorie = (id: number | any): Promise<any> => {
  return api
    .delete(`${ASSOCIATION_URI}?id=${id}`)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const deleteHomonorieResponsable = (id: number | any): Promise<any> => {
  return api
    .delete(`${ASSOCIATION_RESPONSABLE}?id=${id}`)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

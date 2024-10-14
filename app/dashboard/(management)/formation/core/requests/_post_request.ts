import api from "@/app/shared/api/ApiHelper";
import { AxiosResponse } from "axios";
import { FORMATION_URI } from "./_get_request";

export const postFormation = (data: any): Promise<any> => {
  return api
    .post(FORMATION_URI, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const putFormation = (id: number, data: any): Promise<any> => {
  return api
    .put(`${FORMATION_URI}?id=${id}`, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

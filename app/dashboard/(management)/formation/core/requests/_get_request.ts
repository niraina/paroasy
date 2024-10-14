import api from "@/app/shared/api/ApiHelper";
import { AxiosResponse } from "axios";
export const FORMATION_URI = "/api/formation";

export const getAllFormation = (data: any): Promise<any> => {
  return api
    .get(FORMATION_URI, {
      params: { ...data },
    })
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const getFormation = (id: number): Promise<any> => {
  return api
    .get(`${FORMATION_URI}?id=${id}`)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

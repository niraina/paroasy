import api from "@/app/shared/api/ApiHelper";
import { AxiosResponse } from "axios";
export const DAILY_URI = "/api/tonokira/daily";

export const getAllTonokiraDaily = (data: any): Promise<any> => {
  return api
    .get(DAILY_URI, {
      params: { ...data },
    })
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const getTonokiraDaily = (id: number): Promise<any> => {
  return api
    .get(`${DAILY_URI}?id=${id}`)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

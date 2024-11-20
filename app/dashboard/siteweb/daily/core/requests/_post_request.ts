import api from "@/app/shared/api/ApiHelper";
import { AxiosResponse } from "axios";
import { DAILY_URI } from "./_get_request";

export const postTonokiraDaily = (data: any): Promise<any> => {
  return api
    .post(DAILY_URI, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const putTonokiraDaily = (id: number, data: any): Promise<any> => {
  return api
    .put(`${DAILY_URI}?id=${id}`, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

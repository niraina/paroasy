import api from "@/app/shared/api/ApiHelper";
import { AxiosResponse } from "axios";
import { DAILY_URI } from "./_get_request";

export const deleteTonokiraDaily = (id: number | any): Promise<any> => {
  return api
    .delete(`${DAILY_URI}?id=${id}`)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

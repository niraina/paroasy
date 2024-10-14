import api from "@/app/shared/api/ApiHelper";
import { AxiosResponse } from "axios";
import { FORMATION_URI } from "./_get_request";

export const deleteFormation = (id: number | any): Promise<any> => {
  return api
    .delete(`${FORMATION_URI}?id=${id}`)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

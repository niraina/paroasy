import api from "@/app/shared/api/ApiHelper";
import { AxiosResponse } from "axios";
import { RESPONSABLE } from "./_get_request";

const DEL_URI = "/api/sante";

export const deleteSante = (id: number | any): Promise<any> => {
  return api
    .delete(`${DEL_URI}?id=${id}`)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const deleteSanteResponsable = (id: number | any): Promise<any> => {
  return api
    .delete(`${RESPONSABLE}?id=${id}`)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

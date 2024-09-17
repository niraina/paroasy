import api from "@/app/shared/api/ApiHelper";
import { AxiosResponse } from "axios";
import { URI_RESPONSABLE } from "./_get_request";

const DEL_URI = "/api/etablisement";

export const deleteEtablisement = (id: number | any): Promise<any> => {
  return api
    .delete(`${DEL_URI}?id=${id}`)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const deleteResponsable = (id: number | any): Promise<any> => {
  return api
    .delete(`${URI_RESPONSABLE}?id=${id}`)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

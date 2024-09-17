import api from "@/app/shared/api/ApiHelper";
import { AxiosResponse } from "axios";

const URI = "/api/post";

export const postActus = (data: any): Promise<any> => {
  return api
    .post(URI, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

export const putActus = (id: number, data: any): Promise<any> => {
  return api
    .put(`${URI}?id=${id}`, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

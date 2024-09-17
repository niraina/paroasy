import api from "@/app/shared/api/ApiHelper";
import { AxiosResponse } from "axios";

const POST_URI = "/api/diocese";

export const postDiocese = (data: any): Promise<any> => {
  return api
    .post(POST_URI, data)
    .then((response: AxiosResponse<any>) => response)
    .catch((error) => error);
};

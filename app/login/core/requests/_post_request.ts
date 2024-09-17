import api from "@/app/shared/api/ApiHelper";

export const loginPost = (data: any): Promise<any> => {
  return api
    .post("/api/login", data)
    .then((response) => response)
    .catch((error) => ({
      error,
      errMessage: "Une erreur est survenue",
      success: false,
      data: null,
    }));
};

export const registerPost = (data: any): Promise<any> => {
  return api
    .post("/api/register", data)
    .then((response) => response)
    .catch((error) => ({
      error,
      errMessage: "Une erreur est survenue",
      success: false,
      data: null,
    }));
};

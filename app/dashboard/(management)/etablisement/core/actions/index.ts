import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllEtablisement,
  getAllResponsable,
} from "../requests/_get_request";

export const fetchEtablisement = createAsyncThunk(
  "etablisement/fetchEtablisement",
  async (data: any) => {
    try {
      const response = await getAllEtablisement(data);
      return response.data;
    } catch (error: any) {
      //throw new Error(error.message);
      return {
        data: { response: [] as any[] },
        page: 1,
        isLoading: false,
      };
    }
  }
);

export const fetchResponsable = createAsyncThunk(
  "responsable/fetchResponsable",
  async (data: any) => {
    try {
      const response = await getAllResponsable(data);
      return response.data;
    } catch (error: any) {
      //throw new Error(error.message);
      return {
        data: { response: [] as any[] },
        page: 1,
        isLoading: false,
      };
    }
  }
);

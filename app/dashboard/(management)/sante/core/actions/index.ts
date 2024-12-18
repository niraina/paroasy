import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllSante, getAllSanteResponsable } from "../requests/_get_request";

export const fetchSante = createAsyncThunk(
  "sante/fetchSante",
  async (data: any) => {
    try {
      const response = await getAllSante(data);
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

export const fetchSanteResponsable = createAsyncThunk(
  "sante_responsable/fetchSanteResponsable",
  async (data: any) => {
    try {
      const response = await getAllSanteResponsable(data);
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

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllHomonorie,
  getAllHomonorieResponsable,
} from "../requests/_get_request";

export const fetchHomonorie = createAsyncThunk(
  "homonorie/fetchHomonorie",
  async (data: any) => {
    try {
      const response = await getAllHomonorie(data);
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

export const fetchHomonorieResponsable = createAsyncThunk(
  "homonorie_responsable/fetchHomonorieResponsable",
  async (data: any) => {
    try {
      const response = await getAllHomonorieResponsable(data);
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

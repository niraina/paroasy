import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllParoasy } from "../requests/_get_request";

export const fetchEglise = createAsyncThunk(
  "eglise/fetchEglise",
  async (data: any) => {
    try {
      const response = await getAllParoasy(data);
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

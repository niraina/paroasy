import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllEcoleCathesiste } from "../requests/_get_request";

export const fetchEcoleCathesiste = createAsyncThunk(
  "ecoleCathesiste/fetchEcoleCathesiste",
  async (data: any) => {
    try {
      const response = await getAllEcoleCathesiste(data);
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

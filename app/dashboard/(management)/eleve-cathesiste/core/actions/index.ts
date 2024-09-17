import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllEleveCathesiste } from "../requests/_get_request";

export const fetchEleveCathesiste = createAsyncThunk(
  "eleveCathesiste/fetchEleveCathesiste",
  async (data: any) => {
    try {
      const response = await getAllEleveCathesiste(data);
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

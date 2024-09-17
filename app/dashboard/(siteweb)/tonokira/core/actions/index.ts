import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllTonokira } from "../requests/_get_request";

export const fetchTonokira = createAsyncThunk(
  "tonokira/fetchTonokira",
  async (data: any) => {
    try {
      const response = await getAllTonokira(data);
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

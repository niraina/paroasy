import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPreast } from "../requests/_get_request";

export const fetchPreast = createAsyncThunk(
  "preast/fetchPreast",
  async (data: any) => {
    try {
      const response = await getAllPreast(data);
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

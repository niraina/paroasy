import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllFormation } from "../requests/_get_request";

export const fetchFormation = createAsyncThunk(
  "formation/fetchFormation",
  async (data: any) => {
    try {
      const response = await getAllFormation(data);
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

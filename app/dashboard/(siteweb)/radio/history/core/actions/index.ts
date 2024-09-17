import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllRadio } from "../requests/_get_request";

export const fetchRadio = createAsyncThunk(
  "radio/fetchRadio",
  async (data: any) => {
    try {
      const response = await getAllRadio(data);
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

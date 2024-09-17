import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPersonel } from "../requests/_get_request";

export const fetchPersonel = createAsyncThunk(
  "personel/fetchPersonel",
  async (data: any) => {
    try {
      const response = await getAllPersonel(data);
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

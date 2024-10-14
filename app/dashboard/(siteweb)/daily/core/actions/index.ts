import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllTonokiraDaily } from "../requests/_get_request";

export const fetchTonokiraDaily = createAsyncThunk(
  "tonokira_daily/fetchTonokiraDaily",
  async (data: any) => {
    try {
      const response = await getAllTonokiraDaily(data);
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

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllDailyProgram } from "../requests/_get_request";

export const fetchDailyProgram = createAsyncThunk(
  "dailyProgram/fetchDailyProgram",
  async (data: any) => {
    try {
      const response = await getAllDailyProgram(data);
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

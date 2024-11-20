import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllHome } from "../requests/_get_request";

export const fetchHome = createAsyncThunk(
  'home/fetchHome',
  async (data: any) => {
    try {
      const response = await getAllHome(data)
      return response.data;
    } catch (error: any) {
      //throw new Error(error.message);
      return {
        data: { response: [] as any[] },
        page: 1,
        isLoading: false,
      }
    }
  }
);
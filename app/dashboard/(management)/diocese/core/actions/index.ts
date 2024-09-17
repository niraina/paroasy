import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllDiocese } from "../requests/_get_request";

export const fetchDiocese = createAsyncThunk(
  'diocese/fetchDiocese',
  async (data: any) => {
    try {
      const response = await getAllDiocese(data)
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
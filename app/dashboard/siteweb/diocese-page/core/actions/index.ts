import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllDiocesePage } from "../requests/_get_request";

export const fetchPageDiocese = createAsyncThunk(
  "pageDiocese/fetchPageDiocese",
  async (data: any) => {
    try {
      const response = await getAllDiocesePage(data);
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

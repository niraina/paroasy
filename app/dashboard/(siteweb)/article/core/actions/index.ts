import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllArticle } from "../requests/_get_request";

export const fetchArticle = createAsyncThunk(
  'article/fetchArticle',
  async (data: any) => {
    try {
      const response = await getAllArticle(data)
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
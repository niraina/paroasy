import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllBook,
  getAllLibrairy,
  getAllLibrairyResponsable,
} from "../requests/_get_request";

export const fetchLibrairy = createAsyncThunk(
  "librairy/fetchLibrairy",
  async (data: any) => {
    try {
      const response = await getAllLibrairy(data);
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

export const fetchLibrairyResponsable = createAsyncThunk(
  "librairy_responsable/fetchLibrairyResponsable",
  async (data: any) => {
    try {
      const response = await getAllLibrairyResponsable(data);
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

export const fetchBook = createAsyncThunk(
  "book/fetchBook",
  async (data: any) => {
    try {
      const response = await getAllBook(data);
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

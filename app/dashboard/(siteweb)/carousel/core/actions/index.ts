import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCarousel } from "../requests/get_requests";

export const fetchCarousel = createAsyncThunk(
    'carousel/fetchCarousel',
    async () => {
        try {
            const response = await getAllCarousel()
            return response.data;
        } catch (error: any) {
            return {
                data: [] as any[],
                success: false
            }
        }
    }
);
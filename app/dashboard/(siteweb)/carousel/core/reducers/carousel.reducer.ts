/* eslint-disable @typescript-eslint/no-explicit-any */
import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchCarousel } from "../actions";

const initialState = {
  response: {
    data: [],
    success: true
  },
  isLoading: false,
  error: null,
}

const reducer = createSlice({
  name: "carousel",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarousel.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCarousel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload ?? initialState.response
        state.error = null;
      })
      .addCase(fetchCarousel.rejected, (state, action) => {
        state.isLoading = false;
        state.response =  {
          data: [] ,
          success: false
        };
      })
  },
});

export const carouselReducer = reducer.reducer;

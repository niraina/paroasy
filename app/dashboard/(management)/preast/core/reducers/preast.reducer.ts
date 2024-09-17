/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataModel } from "@/app/shared/models";
import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PreastModel, RequestPreast } from "../models/preast.model";
import { fetchPreast } from "../actions";

const initialState: DataModel<PreastModel, RequestPreast> = {
  request: {
    itemsPerPage: 100,
    page: 1,
  },
  response: {
    data: [],
    page: 1,
    itemsPerPage: 100,
    success: true,
    currentPage: 1,
  },
  isLoading: false,
  error: null,
};

const reducer = createSlice({
  name: "preast",
  initialState: initialState,
  reducers: {
    setPreastReset: (state: Draft<typeof initialState>) => {
      state.request = initialState.request;
      state.response = initialState.response;
      state.error = initialState.error;
      state.isLoading = initialState.isLoading;
    },
    setPreastRequest: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.request>
    ) => {
      state.request = { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPreast.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPreast.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload ?? initialState.response;
        state.error = null;
      })
      .addCase(fetchPreast.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.response = {
          data: [],
          page: 1,
          itemsPerPage: 100,
          success: false,
          currentPage: 1,
        };
      });
  },
});

export const { setPreastRequest, setPreastReset } = reducer.actions;

export const PreastReducer = reducer.reducer;

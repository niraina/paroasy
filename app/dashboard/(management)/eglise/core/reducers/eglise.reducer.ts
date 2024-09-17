/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataModel } from "@/app/shared/models";
import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EgliseModel, RequestEglise } from "../models/eglise.model";
import { fetchEglise } from "../actions";

const initialState: DataModel<EgliseModel, RequestEglise> = {
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
  name: "eglise",
  initialState: initialState,
  reducers: {
    setEgliseReset: (state: Draft<typeof initialState>) => {
      state.request = initialState.request;
      state.response = initialState.response;
      state.error = initialState.error;
      state.isLoading = initialState.isLoading;
    },
    setEgliseRequest: (
      state: Draft<typeof initialState>,
      action: PayloadAction<
        typeof initialState.request
      > /*{payload: RequestUser,type:string}*/
    ) => {
      state.request = { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEglise.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEglise.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload ?? initialState.response;
        state.error = null;
      })
      .addCase(fetchEglise.rejected, (state, action) => {
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

export const { setEgliseRequest, setEgliseReset } = reducer.actions;

export const EgliseReducer = reducer.reducer;

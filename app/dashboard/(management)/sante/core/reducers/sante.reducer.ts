/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataModel } from "@/app/shared/models";
import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RequestSante, SanteModel } from "../models/sante.model";
import { fetchSante } from "../actions";

const initialState: DataModel<SanteModel, RequestSante> = {
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
  name: "sante",
  initialState: initialState,
  reducers: {
    setSanteReset: (state: Draft<typeof initialState>) => {
      state.request = initialState.request;
      state.response = initialState.response;
      state.error = initialState.error;
      state.isLoading = initialState.isLoading;
    },
    setSanteRequest: (
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
      .addCase(fetchSante.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSante.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload ?? initialState.response;
        state.error = null;
      })
      .addCase(fetchSante.rejected, (state, action) => {
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

export const { setSanteRequest, setSanteReset } = reducer.actions;

export const SanteReducer = reducer.reducer;

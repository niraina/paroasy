/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataModel } from "@/app/shared/models";
import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TonokiraModel, RequestTonokira } from "../models/home.model";
import { fetchTonokira } from "../actions";

const initialState: DataModel<TonokiraModel, RequestTonokira> = {
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
  name: "tonokira",
  initialState: initialState,
  reducers: {
    setTonokiraReset: (state: Draft<typeof initialState>) => {
      state.request = initialState.request;
      state.response = initialState.response;
      state.error = initialState.error;
      state.isLoading = initialState.isLoading;
    },
    setTonokiraRequest: (
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
      .addCase(fetchTonokira.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTonokira.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload ?? initialState.response;
        state.error = null;
      })
      .addCase(fetchTonokira.rejected, (state, action) => {
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

export const { setTonokiraRequest, setTonokiraReset } = reducer.actions;

export const TonokiraReducer = reducer.reducer;

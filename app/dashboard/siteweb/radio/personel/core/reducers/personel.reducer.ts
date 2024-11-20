/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataModel } from "@/app/shared/models";
import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PersonelModel, RequestPersonel } from "../models/personel.model";
import { fetchPersonel } from "../actions";

const initialState: DataModel<PersonelModel, RequestPersonel> = {
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
  name: "personel",
  initialState: initialState,
  reducers: {
    setPersonelReset: (state: Draft<typeof initialState>) => {
      state.request = initialState.request;
      state.response = initialState.response;
      state.error = initialState.error;
      state.isLoading = initialState.isLoading;
    },
    setPersonelRequest: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.request>
    ) => {
      state.request = { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonel.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPersonel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload ?? initialState.response;
        state.error = null;
      })
      .addCase(fetchPersonel.rejected, (state, action) => {
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

export const { setPersonelRequest, setPersonelReset } = reducer.actions;

export const PersonelReducer = reducer.reducer;

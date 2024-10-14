/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataModel } from "@/app/shared/models";
import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  RequestResponsableHomonorie,
  ResponsableHomonorieModel,
} from "../models/responsable.model";
import { fetchHomonorieResponsable } from "../actions";

const initialState: DataModel<
  ResponsableHomonorieModel,
  RequestResponsableHomonorie
> = {
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
  name: "homonorie_responsable",
  initialState: initialState,
  reducers: {
    setHomonorieResponsableReset: (state: Draft<typeof initialState>) => {
      state.request = initialState.request;
      state.response = initialState.response;
      state.error = initialState.error;
      state.isLoading = initialState.isLoading;
    },
    setHomonorieResponsableRequest: (
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
      .addCase(fetchHomonorieResponsable.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHomonorieResponsable.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload ?? initialState.response;
        state.error = null;
      })
      .addCase(fetchHomonorieResponsable.rejected, (state, action) => {
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

export const { setHomonorieResponsableRequest, setHomonorieResponsableReset } =
  reducer.actions;

export const HomonorieResponsableReducer = reducer.reducer;

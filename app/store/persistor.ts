import { AnyAction, Reducer } from "@reduxjs/toolkit";
import storage from "reduxjs-toolkit-persist/lib/storage";
import autoMergeLevel1 from "reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1";
import {
  persistReducer,
} from "reduxjs-toolkit-persist";
import { rootReducers } from "./rootReducer";
const persistConfig = {
    key: "root",
    storage: storage,
    stateReconciler: autoMergeLevel1,
    whitelist: ["currentUser"],
  };
  
export  const _persistedReducer: Reducer<
    ReturnType<typeof rootReducers>,
    AnyAction
  > = persistReducer<ReturnType<typeof rootReducers>, AnyAction>(
    persistConfig,
    rootReducers
  );
  
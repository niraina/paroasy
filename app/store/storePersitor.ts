import { persistStore } from "reduxjs-toolkit-persist";
import { store } from "./store";

export const persistor = persistStore(store);
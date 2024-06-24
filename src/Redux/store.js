import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./Slices/AuthSlice";

export const store = configureStore({
    reducer: {
        auth: AuthSliceReducer
    },
    devTools: true
});
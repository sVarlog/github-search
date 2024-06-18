import { configureStore } from "@reduxjs/toolkit";
import mainSliceReducer from "./mainSlice";

export const store = configureStore({
    reducer: {
        mainSlice: mainSliceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

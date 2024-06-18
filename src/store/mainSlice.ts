import { createSlice } from "@reduxjs/toolkit";
import { Theme } from "../utils/enums";

interface MainSliceState {
    resultsPerPage: number;
    page: number;
    theme: Theme;
}

const initialState: MainSliceState = {
    resultsPerPage: 50,
    page: 1,
    theme: Theme.light,
};

const mainSlice = createSlice({
    name: "mainSlice",
    initialState,
    reducers: {
        updateCurrentPage: (state, action) => {
            state.page = action.payload;
        },
        toggleTheme: (state) => {
            state.theme =
                state.theme === Theme.light ? Theme.dark : Theme.light;
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
    },
});

export const { updateCurrentPage, toggleTheme, setTheme } = mainSlice.actions;
export default mainSlice.reducer;

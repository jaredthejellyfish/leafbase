import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

const initialState = {
  theme: "",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

const theme = (state: RootState) => state;

export const set = createSelector(theme, (theme) => theme);

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;

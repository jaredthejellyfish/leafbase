import { createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

const initialState = {
  isNavDropdownOpen: false,
};

const isNavDropdownOpenSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setNavDropdownOpen(state, action) {
      state.isNavDropdownOpen = action.payload;
    },
  },
});

const isNavDropdownOpen = (state: RootState) => state;

export const set = createSelector(
  isNavDropdownOpen,
  (isNavDropdownOpen) => isNavDropdownOpen
);

export const { setNavDropdownOpen } = isNavDropdownOpenSlice.actions;
export default isNavDropdownOpenSlice.reducer;

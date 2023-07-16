import { createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

const initialState = {
  filter: 're',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

const filter = (state: RootState) => state;

export const set = createSelector(filter, (filter) => filter);

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;

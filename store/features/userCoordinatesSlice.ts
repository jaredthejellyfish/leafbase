import { createSlice, createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/store/store';

const initialState: {
  userCoordinates: { lat: undefined | number; lon: undefined | number };
} = { userCoordinates: { lat: undefined, lon: undefined } };

const userCoordinatesSlice = createSlice({
  name: 'userCoordinates',
  initialState: initialState,
  reducers: {
    setUserCoordinates(state, action) {
      state.userCoordinates = action.payload;
    },
  },
});

const userCoordinates = (state: RootState) => state;

export const set = createSelector(
  userCoordinates,
  (coordinates) => coordinates
);

export const { setUserCoordinates } = userCoordinatesSlice.actions;
export default userCoordinatesSlice.reducer;

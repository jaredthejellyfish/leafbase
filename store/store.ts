import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userCoordinatesSlice from './features/userCoordinatesSlice';
import navDropdownSlice from './features/navDropdownSlice';
import themeSlice from './features/themeSlice';

const rootReducer = combineReducers({
  theme: themeSlice,
  dropdown: navDropdownSlice,
  userCoordinates: userCoordinatesSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

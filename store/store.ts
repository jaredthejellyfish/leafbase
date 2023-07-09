import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeSlice from './features/themeSlice';
import navDropdownSlice from './features/navDropdownSlice';

const rootReducer = combineReducers({
  theme: themeSlice,
  dropdown: navDropdownSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

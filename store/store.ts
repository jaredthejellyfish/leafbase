import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeSlice from "./features/themeSlice";

const rootReducer = combineReducers({
  theme: themeSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

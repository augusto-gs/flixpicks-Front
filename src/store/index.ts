import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { moviesReducer } from "./features/movies/moviesSlice";
import { uiReducer } from "./features/UI/uiSlice";
import { userReducer } from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    moviesState: moviesReducer,
    uiState: uiReducer,
    userState: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

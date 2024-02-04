import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserLoggedStructure, UserTokenStructure } from "../../../types";

const initialUserState: UserLoggedStructure = {
  id: "",
  token: "",
  username: "",
  isLogged: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    userLogin: (
      currentState: UserLoggedStructure,
      action: PayloadAction<UserTokenStructure>,
    ) => ({ ...currentState, ...action.payload, isLogged: true }),

    userLogout: () => ({
      ...initialUserState,
    }),
  },
});

export const {
  actions: {
    userLogin: userLoginActionCreator,
    userLogout: userLogoutActionCreator,
  },
  reducer: userReducer,
} = userSlice;

import {
  correctlyLoggedUserMock,
  loggedUserMock,
} from "../../../mocks/userMocks/userMock";
import { UserLoggedStructure } from "../../../types";
import {
  userLoginActionCreator,
  userLogoutActionCreator,
  userReducer,
} from "./userSlice";

let initialState: UserLoggedStructure;

describe("Given a userSlice with a loginUser reducer", () => {
  describe("When it receives a current state and a user with a token", () => {
    test("Then it should return the new state with the logged in user", () => {
      initialState = {
        id: "",
        isLogged: false,
        token: "",
        username: "",
      };

      const actualUserState = userReducer(
        initialState,
        userLoginActionCreator(loggedUserMock),
      );

      expect(actualUserState).toStrictEqual(correctlyLoggedUserMock);
    });
  });
});

describe("Given a userSlice with a logoutUser reducer", () => {
  describe("When it is called", () => {
    test("Then it should reset the current state to the initial state", () => {
      const loggedInInitialState: UserLoggedStructure = correctlyLoggedUserMock;

      const currentState = userReducer(
        loggedInInitialState,
        userLogoutActionCreator(),
      );

      expect(currentState).toStrictEqual(initialState);
    });
  });
});

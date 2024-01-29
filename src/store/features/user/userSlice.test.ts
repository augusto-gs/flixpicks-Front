import {
  correctlyLoggedUserMock,
  loggedUserMock,
} from "../../../mocks/userMocks/userMock";
import { UserLoggedStructure } from "../../../types";
import { userLoginActionCreator, userReducer } from "./userSlice";

describe("Given a userSlice with a loginUser reducer", () => {
  describe("When it receives a currentState and a user with a token", () => {
    test("Then it should return the new state with the logged in user", () => {
      const initialState: UserLoggedStructure = {
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

import { renderHook } from "@testing-library/react";
import useToken from "./useToken";
import { subMock, tokenMock } from "../../mocks/userMocks/userMock";

describe("Given a getDecodedToken function on a useToken custom hook", () => {
  describe("When it receives a token", () => {
    test("Then it should decode the token and return the user's id and username", async () => {
      const {
        result: {
          current: { getDecodedToken },
        },
      } = renderHook(() => useToken());

      const userData = await getDecodedToken(tokenMock);

      expect(userData).toStrictEqual(subMock);
    });
  });
});

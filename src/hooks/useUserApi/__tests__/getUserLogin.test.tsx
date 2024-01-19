import { renderHook } from "@testing-library/react";
import useUserApi from "../useUserApi";
import { providerWrapper } from "../../../testUtils/testUtils";
import { tokenMock, userMock } from "../../../mocks/userMocks/userMock";

describe("Given a useUserApi custom hook with a getUserLogin function", () => {
  describe("When it receives correct user credentials", () => {
    test("Then it should return a token", async () => {
      const {
        result: {
          current: { getUserLogin },
        },
      } = renderHook(() => useUserApi(), { wrapper: providerWrapper });

      const token = await getUserLogin(userMock);

      expect(token).toBe(tokenMock);
    });
  });
});

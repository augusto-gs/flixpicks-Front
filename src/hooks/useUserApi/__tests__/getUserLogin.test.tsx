import { renderHook } from "@testing-library/react";
import useUserApi from "../useUserApi";
import { providerWrapper } from "../../../testUtils/testUtils";
import { tokenMock, userMock } from "../../../mocks/userMocks/userMock";
import { server } from "../../../mocks/msw/node";
import { errorHandlers } from "../../../mocks/msw/errorHandlers";
import { toast } from "react-toastify";
import { setStyle } from "../../../utils/toastifyFunctions";

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

  describe("When it receives incorrect user credentials", () => {
    test("Then it should call the toast function with a 'Wrong credentials' error message", async () => {
      const expectedErrorMessage = "Wrong credentials";

      server.use(...errorHandlers);

      toast.error = vi.fn();

      const {
        result: {
          current: { getUserLogin },
        },
      } = renderHook(() => useUserApi(), { wrapper: providerWrapper });

      await getUserLogin(userMock);

      expect(toast.error).toHaveBeenCalledWith(
        expectedErrorMessage,
        setStyle("#d65745", "#F3CDC8"),
      );
    });
  });
});

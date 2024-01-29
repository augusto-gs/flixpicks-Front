import { renderHook } from "@testing-library/react";
import useLocalStorage from "./useLocalStorage";

describe("Given the useLocalStorage custom hook", () => {
  const key = "FlixPicKsTokeN";
  const value = "tokenStorage";

  describe("When the setToken and getToken functions are called to save and return the token", () => {
    test("Then it should be able to access the token at the localStorage", () => {
      const {
        result: {
          current: { getToken, setToken },
        },
      } = renderHook(() => useLocalStorage());

      setToken(key, value);

      expect(getToken()).toStrictEqual(value);
    });
  });

  describe("When the removeToken function is call with a token key", () => {
    test("Then it should remove the token from the store", () => {
      const {
        result: {
          current: { removeToken, getToken, setToken },
        },
      } = renderHook(() => useLocalStorage());

      setToken(key, value);
      removeToken(key);

      expect(getToken()).not.toStrictEqual(value);
    });
  });
});

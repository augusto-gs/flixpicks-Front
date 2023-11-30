import { renderHook } from "@testing-library/react";
import useMoviesApi from "./useMoviesApi";
import { moviesMock } from "../mocks/moviesMocks";

describe("Given a useMoviesApi custom hook", () => {
  describe("When it calls its getMovies function", () => {
    test("Then it should return the movie Arrival and La La Land", async () => {
      const {
        result: {
          current: { getMovies },
        },
      } = renderHook(() => useMoviesApi());

      const expectedMovies = await getMovies();

      expect(expectedMovies).toStrictEqual(moviesMock);
    });
  });
});
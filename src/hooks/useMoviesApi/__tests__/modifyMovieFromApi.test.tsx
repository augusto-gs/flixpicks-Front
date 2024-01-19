import { renderHook } from "@testing-library/react";
import useMoviesApi from "../useMoviesApi";
import { providerWrapper } from "../../../testUtils/testUtils";
import movieMock from "../../../mocks/movieMock";
import { modifiedMoviesMock } from "../../../mocks/moviesMocks";
import { server } from "../../../mocks/msw/node";
import { errorHandlers } from "../../../mocks/msw/errorHandlers";
import { toast } from "react-toastify";
import { setStyle } from "../../../utils/toastifyFunctions";

describe("Given a modifyMovieFromApi function on a useMoviesApi", () => {
  describe("When it receives an id for the movie Arrival", () => {
    test("Then it should return the movie Arrival modified", async () => {
      const {
        result: {
          current: { modifyMovieFromApi },
        },
      } = renderHook(() => useMoviesApi(), { wrapper: providerWrapper });

      const movie = await modifyMovieFromApi(movieMock, movieMock._id);

      expect(movie).toStrictEqual(modifiedMoviesMock[0]);
    });
  });

  describe("When it receives an id for the movie Arrival and the response from the API fails", () => {
    test("Then it should call the toast function with a 'Error! Failed to modify a movie' message", async () => {
      server.use(...errorHandlers);
      toast.error = vi.fn();

      const {
        result: {
          current: { modifyMovieFromApi },
        },
      } = renderHook(() => useMoviesApi(), { wrapper: providerWrapper });

      await modifyMovieFromApi(movieMock, movieMock._id);

      expect(toast.error).toHaveBeenCalledWith(
        "Error! Failed to modify a movie",
        setStyle("#d65745", "#F3CDC8"),
      );
    });
  });
});

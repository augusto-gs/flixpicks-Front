import { renderHook } from "@testing-library/react";
import useMoviesApi from "../useMoviesApi";
import { providerWrapper } from "../../../testUtils/testUtils";
import movieMock from "../../../mocks/movieMock";
import { server } from "../../../mocks/msw/node";
import { errorHandlers } from "../../../mocks/msw/errorHandlers";
import { toast } from "react-toastify";
import { setStyle } from "../../../utils/toastifyFunctions";

describe("Given a loadSelectedMovie method on a useMoviesApi hook", () => {
  describe("When it receives an id for the movie La La Land", () => {
    test("Then it should return the movie La La Land", async () => {
      const {
        result: {
          current: { loadSelectedMovie },
        },
      } = renderHook(() => useMoviesApi(), { wrapper: providerWrapper });

      const selectedMovie = await loadSelectedMovie(movieMock._id);

      expect(selectedMovie).toStrictEqual(movieMock);
    });
  });

  describe("When it receives an id for the the movie La La Land and the response failes", () => {
    test("Then it should call the function toast with a 'Error! Failed to select a movie' message", async () => {
      server.use(...errorHandlers);
      toast.error = vi.fn();
      const expectedErrorMessage = "Error! Failed to select a movie";

      const {
        result: {
          current: { loadSelectedMovie },
        },
      } = renderHook(() => useMoviesApi(), { wrapper: providerWrapper });

      await loadSelectedMovie(movieMock._id);

      expect(toast.error).toHaveBeenCalledWith(
        expectedErrorMessage,
        setStyle("#d65745", "#F3CDC8"),
      );
    });
  });
});

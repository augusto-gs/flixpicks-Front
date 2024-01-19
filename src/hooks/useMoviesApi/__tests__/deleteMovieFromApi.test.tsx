import { renderHook } from "@testing-library/react";
import useMoviesApi from "../useMoviesApi";
import { providerWrapper } from "../../../testUtils/testUtils";
import { server } from "../../../mocks/msw/node";
import { errorHandlers } from "../../../mocks/msw/errorHandlers";
import { toast } from "react-toastify";
import { setStyle } from "../../../utils/toastifyFunctions";

describe("Given a useMoviesApi custom hook", () => {
  const expectedMovieId = "65637a12d4b93a3787b660f7";

  describe("When it calls its deleteMovie method with an id for the movie Arrival", () => {
    test("Then it should delete the movie Arrival from the API", async () => {
      const {
        result: {
          current: { deleteMovieFromApi },
        },
      } = renderHook(() => useMoviesApi(), { wrapper: providerWrapper });

      const expectedEmptyObject = {};

      const response = await deleteMovieFromApi(expectedMovieId);

      expect(response).toStrictEqual(expectedEmptyObject);
    });
  });

  describe("When it calls its deleteMovie method and the response from the API fails", () => {
    test("Then it should call the function toast with a 'Error! Failed to delete a movie' message", async () => {
      server.use(...errorHandlers);

      toast.error = vi.fn();

      const expectedErrorFeedback = "Error! Failed to delete a movie";

      const {
        result: {
          current: { deleteMovieFromApi },
        },
      } = renderHook(() => useMoviesApi(), { wrapper: providerWrapper });

      await deleteMovieFromApi(expectedMovieId);

      expect(toast.error).toHaveBeenCalledWith(
        expectedErrorFeedback,
        setStyle("#d65745", "#F3CDC8"),
      );
    });
  });
});

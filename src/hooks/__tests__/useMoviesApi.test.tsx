import { renderHook, screen, waitFor } from "@testing-library/react";
import useMoviesApi from "../useMoviesApi";
import { customRender, providerWrapper } from "../../testUtils/testUtils";
import { moviesMock } from "../../mocks/moviesMocks";
import App from "../../components/App/App";
import { server } from "../../mocks/msw/node";
import { errorHandlers } from "../../mocks/msw/errorHandlers";
import { MemoryRouter } from "react-router-dom";

describe("Given a useMoviesApi custom hook", () => {
  describe("When it calls its getMovies function", () => {
    test("Then it should return the movie Arrival and La La Land", async () => {
      const {
        result: {
          current: { getMovies },
        },
      } = renderHook(() => useMoviesApi(), { wrapper: providerWrapper });

      const expectedMovies = await getMovies(import.meta.env.VITE_API_URL);

      expect(expectedMovies).toStrictEqual(moviesMock);
    });
  });

  describe("When it calls its getMovies function and it throws an error", () => {
    test("Then it should navigate to Error page", async () => {
      server.use(...errorHandlers);

      customRender(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const {
        result: {
          current: { getMovies },
        },
      } = renderHook(() => useMoviesApi(), { wrapper: providerWrapper });

      await getMovies(import.meta.env.VITE_API_URL);

      await waitFor(() => {
        const image = screen.getByAltText("Cut cinema reel drawing");

        expect(image).toBeInTheDocument();
      });
    });
  });
});

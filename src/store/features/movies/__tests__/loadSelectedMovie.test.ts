import extendedMovieMocks from "../../../../mocks/movieMocks/extendedMovieMocks";
import { moviesMock } from "../../../../mocks/movieMocks/moviesMocks";
import {
  MovieStructure,
  loadSelectedMovieActionCreator,
  moviesReducer,
} from "../moviesSlice";
import { Movie } from "../types";

describe("Given a movieSlice with a loadSelectedMovie reducer", () => {
  describe("When it receives a list of movies and a movie", () => {
    test("Then it should return a new state with the list of movies and a new selected movie", () => {
      const initialState: MovieStructure = {
        movies: moviesMock,
        selectedMovie: {} as Movie,
      };

      const actualMoviesState = moviesReducer(
        initialState,
        loadSelectedMovieActionCreator(extendedMovieMocks[2]),
      );

      expect(actualMoviesState.selectedMovie).toStrictEqual(
        extendedMovieMocks[2],
      );
    });
  });
});

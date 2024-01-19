import extendedMovieMocks from "../../../../mocks/movieMocks/extendedMovieMocks";
import { moviesMock } from "../../../../mocks/movieMocks/moviesMocks";
import {
  MovieStructure,
  addMovieActionCreator,
  moviesReducer,
} from "../moviesSlice";
import { Movie } from "../types";

describe("Given a addMovie reducer", () => {
  describe("When it receives a movie list and a new movie 'Superbad'", () => {
    test("Then it should return a list of movies with Superbad added to the list", () => {
      const initialState: MovieStructure = {
        movies: moviesMock,
        selectedMovie: {} as Movie,
      };
      const newMovie: Movie = extendedMovieMocks[2];

      const actualMoviesState = moviesReducer(
        initialState,
        addMovieActionCreator(newMovie),
      );

      expect(actualMoviesState.movies).toStrictEqual(extendedMovieMocks);
    });
  });
});

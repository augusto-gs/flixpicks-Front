import movieMock from "../../../../mocks/movieMocks/movieMock";
import {
  modifiedMoviesMock,
  moviesMock,
} from "../../../../mocks/movieMocks/moviesMocks";
import {
  MovieStructure,
  modifyMovieActionCreator,
  moviesReducer,
} from "../moviesSlice";
import { Movie } from "../types";

describe("Given a modifyMovie reducer on a movieSlice", () => {
  describe("When it receives a movie list and a movie La La Land modified", () => {
    test("Then it should return a list of movies with La La Land modified", () => {
      const modifiedMovie = { ...movieMock, name: "Test" };

      const initialState: MovieStructure = {
        movies: moviesMock,
        selectedMovie: {} as Movie,
      };

      const actualMoviesState = moviesReducer(
        initialState,
        modifyMovieActionCreator(modifiedMovie),
      );

      expect(actualMoviesState.movies).toStrictEqual(modifiedMoviesMock);
    });
  });
});

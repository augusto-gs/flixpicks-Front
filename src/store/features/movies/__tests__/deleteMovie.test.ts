import { moviesMock } from "../../../../mocks/moviesMocks";
import {
  MovieStructure,
  deleteMovieActionCreator,
  moviesReducer,
} from "../moviesSlice";

describe("Given a movieSlice deleteMovie reducer", () => {
  describe("When it receives a list of movies and a correct id from Arrival", () => {
    test("Then it should return the list of movies with Arrival removed", () => {
      const initialState: MovieStructure = { movies: moviesMock };
      const expectedDeletedName = "Arrival";

      const actualMoviesState = moviesReducer(
        initialState,
        deleteMovieActionCreator("65637a12d4b93a3787b660f7"),
      );

      actualMoviesState.movies.forEach((movie) => {
        expect(movie).not.toHaveProperty("name", expectedDeletedName);
      });
    });
  });
});
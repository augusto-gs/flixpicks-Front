import { http, HttpResponse } from "msw";
import { moviesMock, modifiedMoviesMock } from "../movieMocks/moviesMocks";
import extendedMovieMocks from "../movieMocks/extendedMovieMocks";
import movieMock from "../movieMocks/movieMock";

const apiURL = import.meta.env.VITE_API_URL;

export const handlers = [
  http.get(`${apiURL}/movies`, () => HttpResponse.json({ movies: moviesMock })),

  http.delete(`${apiURL}/movies/65637a12d4b93a3787b660f7`, () =>
    HttpResponse.json({}),
  ),

  http.post(`${apiURL}/movies/create`, () =>
    HttpResponse.json({ movie: extendedMovieMocks[2] }),
  ),

  http.get(`${apiURL}/movies/${movieMock._id}`, () =>
    HttpResponse.json({ movie: movieMock }),
  ),

  http.put(`${apiURL}/movies/65637a12d4b93a3787b660f7`, () =>
    HttpResponse.json({ movie: modifiedMoviesMock[0] }),
  ),

  http.post(`${apiURL}/user/login`, () =>
    HttpResponse.json({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWFhYmE4NWFlMWNmZjg2Y2FjMTZmZjIiLCJuYW1lIjoiQXVndXN0byBHb21leiIsImlhdCI6MTcwNTY4Nzc1OSwiZXhwIjoxNzA4Mjc5NzU5fQ.UURtXN1nvA_x_oE9hv327ewXPlMCIJjp_mHBwtMunyE",
    }),
  ),
];

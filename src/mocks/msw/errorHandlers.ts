import { http, HttpResponse } from "msw";

const apiURL = import.meta.env.VITE_API_URL;

export const errorHandlers = [
  http.get(`${apiURL}/movies`, () => HttpResponse.error()),
  http.delete(`${apiURL}/movies/65637a12d4b93a3787b660f7`, () =>
    HttpResponse.error(),
  ),
  http.post(`${apiURL}/movies/create`, () => HttpResponse.error()),
];

import axios from "axios";
import {
  Movie,
  MovieList,
  MovieWithoutId,
} from "../../store/features/movies/types";
import { useCallback } from "react";
import { useAppDispatch } from "../../store/hooks";
import {
  hideLoadingActionCreator,
  showLoadingActionCreator,
} from "../../store/features/UI/uiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setStyle } from "../../utils/toastifyFunctions";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const useMoviesApi = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const getMovies = useCallback(async (): Promise<MovieList | undefined> => {
    dispatch(showLoadingActionCreator());

    try {
      const { data: movies } = await axios.get<{ movies: Movie[] }>(`/movies`);

      dispatch(hideLoadingActionCreator());

      return movies;
    } catch {
      navigate("/error-page");

      dispatch(hideLoadingActionCreator());
    }
  }, [dispatch, navigate]);

  const deleteMovieFromApi = useCallback(
    async (id: string): Promise<Record<string, never> | void> => {
      try {
        dispatch(showLoadingActionCreator());

        const { data } = await axios.delete<Record<string, never>>(
          `movies/${id}`,
        );

        toast.success(
          "Success! You have deleted a movie",
          setStyle("#55b938", "#ccEAc4"),
        );

        dispatch(hideLoadingActionCreator());

        return data;
      } catch {
        dispatch(hideLoadingActionCreator());

        toast.error(
          "Error! Failed to delete a movie",
          setStyle("#d65745", "#F3CDC8"),
        );
      }
    },

    [dispatch],
  );

  const addMovie = useCallback(
    async (newMovie: MovieWithoutId): Promise<Movie | undefined> => {
      dispatch(showLoadingActionCreator());

      try {
        const {
          data: { movie },
        } = await axios.post<{ movie: Movie }>("/movies/create", newMovie);

        dispatch(hideLoadingActionCreator());

        toast.success(
          "Sucess! You have added your own movie",
          setStyle("#55b938", "#ccEAc4"),
        );

        return movie;
      } catch {
        dispatch(hideLoadingActionCreator());

        toast.error(
          "Error! Failed to add movie",
          setStyle("#d65745", "#F3CDC8"),
        );
      }
    },
    [dispatch],
  );

  const loadSelectedMovie = useCallback(
    async (id: string): Promise<Movie | void> => {
      try {
        dispatch(showLoadingActionCreator());

        const {
          data: { movie },
        } = await axios.get<{ movie: Movie }>(`/movies/${id}`);

        dispatch(hideLoadingActionCreator());

        return movie;
      } catch {
        dispatch(hideLoadingActionCreator());

        toast.error(
          "Error! Failed to select a movie",
          setStyle("#d65745", "#F3CDC8"),
        );
      }
    },
    [dispatch],
  );

  const modifyMovieFromApi = useCallback(
    async (modifiedMovie: MovieWithoutId, id: string) => {
      try {
        dispatch(showLoadingActionCreator());

        const {
          data: { movie },
        } = await axios.put<{ movie: Movie }>(`/movies/${id}`, modifiedMovie);

        dispatch(hideLoadingActionCreator());

        toast.success(
          "Sucess! You have modified a movie",
          setStyle("#55b938", "#ccEAc4"),
        );

        return movie;
      } catch {
        dispatch(hideLoadingActionCreator());

        toast.error(
          "Error! Failed to modify a movie",
          setStyle("#d65745", "#F3CDC8"),
        );
      }
    },
    [dispatch],
  );

  return {
    getMovies,
    deleteMovieFromApi,
    addMovie,
    loadSelectedMovie,
    modifyMovieFromApi,
  };
};

export default useMoviesApi;

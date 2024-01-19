import { useNavigate, useParams } from "react-router-dom";
import Form from "../../components/Form/Form";
import {
  loadSelectedMovieActionCreator,
  modifyMovieActionCreator,
} from "../../store/features/movies/moviesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import TitleStyled from "../../styles/shared/TitleStyled";
import useMoviesApi from "../../hooks/useMoviesApi/useMoviesApi";
import { MovieWithoutId } from "../../store/features/movies/types";
import ModifyMoviePageStyled from "./ModifyMoviePageStyled";
import { useEffect } from "react";

const ModifyMoviePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { modifyMovieFromApi, loadSelectedMovie } = useMoviesApi();
  const { movieId } = useParams();

  const formAction = async (movie: MovieWithoutId) => {
    const movieFromForm = await modifyMovieFromApi(movie, movieId as string);

    if (movieFromForm) {
      dispatch(modifyMovieActionCreator(movieFromForm));

      navigate("/home");
    }
  };

  useEffect(() => {
    (async () => {
      const movie = await loadSelectedMovie(movieId as string);

      if (movie) {
        dispatch(loadSelectedMovieActionCreator(movie));
      }

      return movie;
    })();
  }, [dispatch, loadSelectedMovie, movieId]);

  const { selectedMovie } = useAppSelector((state) => state.moviesState);

  return (
    <ModifyMoviePageStyled className="modify-movie-page">
      <TitleStyled className="modify-movie-page__title">
        Modify a movie
      </TitleStyled>
      <Form
        formFunction={formAction}
        selectedMovie={selectedMovie}
        buttonText="Modify"
      />
    </ModifyMoviePageStyled>
  );
};

export default ModifyMoviePage;

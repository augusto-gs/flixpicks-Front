import { useNavigate } from "react-router-dom";
import Form from "../../components/Form/Form";
import { addMovieActionCreator } from "../../store/features/movies/moviesSlice";
import { useAppDispatch } from "../../store/hooks";
import TitleStyled from "../../styles/shared/TitleStyled";
import AddMoviePageStyled from "./AddMoviePageStyled";
import { MovieWithoutId } from "../../store/features/movies/types";
import useMoviesApi from "../../hooks/useMoviesApi/useMoviesApi";

const AddMoviePage = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addMovie } = useMoviesApi();

  const formAction = async (movie: MovieWithoutId) => {
    const movieFromForm = await addMovie(movie);

    if (movie) {
      dispatch(addMovieActionCreator(movieFromForm!));

      navigate("/home");
    }
  };

  return (
    <AddMoviePageStyled className="add-movie-page">
      <TitleStyled className="add-movie-page__title">
        Add your own movie
      </TitleStyled>
      <Form formFunction={formAction} buttonText="Add" />
    </AddMoviePageStyled>
  );
};

export default AddMoviePage;

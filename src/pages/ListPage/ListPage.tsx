import { useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { useAppDispatch } from "../../store/hooks";
import ListPageStyled from "./ListPageStyled";
import { loadMoviesActionCreator } from "../../store/features/movies/moviesSlice";
import useMoviesApi from "../../hooks/useMoviesApi/useMoviesApi";
import TitleStyled from "../../styles/shared/TitleStyled";

const ListPage = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { getMovies } = useMoviesApi();

  useEffect(() => {
    (async () => {
      const movies = await getMovies();

      if (movies) {
        dispatch(loadMoviesActionCreator(movies.movies));
      }
    })();
  }, [dispatch, getMovies]);

  return (
    <ListPageStyled className="list-page">
      <TitleStyled className="title">Our movies</TitleStyled>
      <MovieList />
    </ListPageStyled>
  );
};

export default ListPage;

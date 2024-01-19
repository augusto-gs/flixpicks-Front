import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import DetailsPageStyled from "./DetailsPageStyled";
import { useEffect } from "react";
import useMoviesApi from "../../hooks/useMoviesApi/useMoviesApi";
import { showBackgroundActionCreator } from "../../store/features/UI/uiSlice";
import {
  deleteMovieActionCreator,
  loadSelectedMovieActionCreator,
} from "../../store/features/movies/moviesSlice";

const DetailsPage = (): React.ReactElement => {
  const { loadSelectedMovie, deleteMovieFromApi } = useMoviesApi();
  const { movieId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    selectedMovie: {
      description,
      director,
      genre,
      imageUrl,
      name,
      releaseDate,
      score,
      stars,
      writer,
      _id,
      isSeen,
    },
  } = useAppSelector((state) => state.moviesState);

  useEffect(() => {
    (async () => {
      const selectedMovie = await loadSelectedMovie(movieId as string);

      if (!selectedMovie) {
        navigate("/");

        return;
      }

      dispatch(loadSelectedMovieActionCreator(selectedMovie));
      dispatch(showBackgroundActionCreator());
    })();
  }, [dispatch, loadSelectedMovie, movieId, navigate]);

  const deleteMovie = async () => {
    await deleteMovieFromApi(_id);

    dispatch(deleteMovieActionCreator(_id));

    navigate("/");
  };

  return (
    <DetailsPageStyled>
      <div className="card-background">
        <article className="movie-details-card">
          <img
            src={`${imageUrl}`}
            alt={`Cover of ${name}`}
            className="movie-details-card__image"
            width="209"
            height="283"
          />
          <div className="movie-details-card__title-container">
            <h2 className="title-container__title">{name}</h2>
            <span className="title-container__score">{score}⭐</span>
          </div>
          <div className="movie-details-card__text-container">
            <div className="movie-details-card__field">
              <span className="movie-details-card__descriptor">Director:</span>
              <span className="movie-details-card__director">{director}</span>
            </div>
            <div className="movie-details-card__field">
              <span className="movie-details-card__descriptor">Writer:</span>
              <span className="movie-details-card__writer">{writer}</span>
            </div>
            <div className="movie-details-card__field">
              <span className="movie-details-card__descriptor">Stars:</span>
              <span className="movie-details-card__stars">{stars}</span>
            </div>
            <div className="movie-details-card__field">
              <span className="movie-details-card__descriptor">Genre</span>
              <span className="movie-details-card__genre">{genre}</span>
            </div>
            <span className="movie-details-card__description">
              {description}
            </span>
            <div className="movie-details-card__field release-date-field">
              <span className="movie-details-card__descriptor">
                Release date
              </span>
              <span className="movie-details-card__release-date">
                {releaseDate}
              </span>
            </div>
            <span className="movie-details-card__seen-status">
              {isSeen ? " Seen ✔️" : "Not seen❌"}
            </span>
          </div>

          <div className="movie-details-card__button-container">
            <Button
              text="Delete"
              type="button"
              actionOnClick={deleteMovie}
              modifier="button--delete"
            />
            <Button
              text="Modify"
              type="button"
              actionOnClick={() => {
                navigate(`/${_id}/modify`);
              }}
            />
          </div>
        </article>
      </div>
    </DetailsPageStyled>
  );
};

export default DetailsPage;

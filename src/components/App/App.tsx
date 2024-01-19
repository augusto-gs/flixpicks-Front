import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import ListPage from "../../pages/ListPage/ListPage";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Loading from "../Loading/Loading";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import "react-toastify/dist/ReactToastify.min.css";
import StyledToast from "../../styles/shared/ToastStyled";
import AddMoviePage from "../../pages/AddMoviePage/AddMoviePage";
import ContainerStyled from "../../styles/shared/ContainerStyled";
import DetailsPage from "../../pages/DetailsPage/DetailsPage";
import Background from "../Background/Background";
import { hideBackgroundActionCreator } from "../../store/features/UI/uiSlice";
import { useEffect } from "react";
import ModifyMoviePage from "../../pages/ModifyMoviePage/ModifyMoviePage";
import LoginPage from "../../pages/LoginPage/LoginPage";

const App = (): React.ReactElement => {
  const { hasBackground, isLoading } = useAppSelector((state) => state.uiState);
  const { selectedMovie } = useAppSelector((state) => state.moviesState);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pathname !== `/${selectedMovie._id}`) {
      dispatch(hideBackgroundActionCreator());
    }
  }, [dispatch, selectedMovie._id, pathname]);

  return (
    <>
      {isLoading && <Loading />}
      {hasBackground && <Background />}
      <StyledToast />
      <Header />
      <ContainerStyled>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<ListPage />} />
          <Route path="/error-page" element={<ErrorPage />} />
          <Route path="/add-movie" element={<AddMoviePage />} />
          <Route path="/:movieId" element={<DetailsPage />} />
          <Route path="/:movieId/modify" element={<ModifyMoviePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </ContainerStyled>
    </>
  );
};

export default App;

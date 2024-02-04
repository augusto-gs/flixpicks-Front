import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage/useLocalStorage";
import { useAppDispatch } from "../../store/hooks";
import Navigation from "../Navigation/Navigation";
import HeaderStyled from "./HeaderStyled";
import { userLogoutActionCreator } from "../../store/features/user/userSlice";

const Header = (): React.ReactElement => {
  const { removeToken } = useLocalStorage();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleUserLogout = () => {
    removeToken("FlixPicKsTokeN");
    dispatch(userLogoutActionCreator());
    navigate(`/login`);
  };

  return (
    <HeaderStyled className="main-header">
      <img
        className="main-header__logo"
        src="/images/flixpicks_logo.svg"
        alt="flixpicks logo on black letters"
        width="197"
        height="100"
      />
      <button className="main-header__logout-button" onClick={handleUserLogout}>
        <img
          src="/images/logout_icon.svg"
          alt="logout icon"
          width="48"
          height="48"
          className="main-header__logout-icon"
        />
      </button>

      <Navigation />
    </HeaderStyled>
  );
};

export default Header;

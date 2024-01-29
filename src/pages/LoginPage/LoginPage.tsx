import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import useLocalStorage from "../../hooks/useLocalStorage/useLocalStorage";
import useToken from "../../hooks/useToken/useToken";
import useUserApi from "../../hooks/useUserApi/useUserApi";
import { userLoginActionCreator } from "../../store/features/user/userSlice";
import { useAppDispatch } from "../../store/hooks";
import TitleStyled from "../../styles/shared/TitleStyled";
import { UserCredentialsStructure } from "../../types";
import LoginPageStyled from "./LoginPageStyled";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { getUserLogin } = useUserApi();
  const { getDecodedToken } = useToken();
  const { setToken } = useLocalStorage();

  const handleUserLogin = async (userCredentials: UserCredentialsStructure) => {
    const token = await getUserLogin(userCredentials);

    if (token) {
      const userData = getDecodedToken(token);

      setToken("FlixPicKsTokeN", token);

      const userLoginData = { ...userData, token };
      dispatch(userLoginActionCreator(userLoginData));

      navigate("/home");
    }
  };

  return (
    <LoginPageStyled className="login-page">
      <TitleStyled className="login-title">Login to your account</TitleStyled>
      <LoginForm actionOnClick={handleUserLogin} />
    </LoginPageStyled>
  );
};

export default LoginPage;

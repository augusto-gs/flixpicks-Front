import LoginForm from "../../components/LoginForm/LoginForm";
import useUserApi from "../../hooks/useUserApi/useUserApi";
import TitleStyled from "../../styles/shared/TitleStyled";
import { UserCredentialsStructure } from "../../types";
import LoginPageStyled from "./LoginPageStyled";

const LoginPage = () => {
  const { getUserLogin } = useUserApi();

  const handleUserLogin = async (userCredentials: UserCredentialsStructure) => {
    const token = await getUserLogin(userCredentials);

    if (!token) {
      return;
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

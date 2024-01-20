import LoginForm from "../../components/LoginForm/LoginForm";
import TitleStyled from "../../styles/shared/TitleStyled";
import LoginPageStyled from "./LoginPageStyled";

const LoginPage = () => (
  <LoginPageStyled className="login-page">
    <TitleStyled className="login-title">Login to your account</TitleStyled>
    <LoginForm />
  </LoginPageStyled>
);

export default LoginPage;

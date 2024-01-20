import Button from "../Button/Button";
import LoginFormStyled from "./LoginFormStyled";

const LoginForm = () => (
  <LoginFormStyled className="login-form" autoComplete="off">
    <label htmlFor="username" className="login-form__label">
      {" "}
      Username
      <input type="text" className="login-form__control" id="username" />
    </label>
    <label htmlFor="password" className="login-form__label">
      {" "}
      Password
      <input type="text" className="login-form__control" id="password" />
    </label>
    <Button text="Login" type="submit" modifier="button--form" />
  </LoginFormStyled>
);

export default LoginForm;

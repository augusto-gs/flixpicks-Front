import Button from "../Button/Button";

const LoginForm = () => (
  <form className="login-form" autoComplete="off">
    <label htmlFor="username" className="login-form__name-label">
      {" "}
      Login
      <input type="text" className="login-form__name-control" id="username" />
    </label>
    <label htmlFor="password" className="login-form__name-label">
      {" "}
      Password
      <input type="text" className="login-form__name-control" id="password" />
    </label>
    <Button text="Login" type="submit" modifier="button--form" />
  </form>
);

export default LoginForm;

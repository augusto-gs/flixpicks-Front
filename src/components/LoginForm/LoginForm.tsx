import { useState } from "react";
import { UserCredentialsStructure } from "../../types";
import Button from "../Button/Button";
import LoginFormStyled from "./LoginFormStyled";

interface LoginFormProps {
  actionOnClick: (userCredentials: UserCredentialsStructure) => void;
}

const LoginForm = ({ actionOnClick }: LoginFormProps) => {
  const initialUserCredentials: UserCredentialsStructure = {
    username: "",
    password: "",
  };

  const [userCredentials, setUserCredentials] =
    useState<UserCredentialsStructure>(initialUserCredentials);

  const { username, password } = userCredentials;

  const isDisabled = username !== "" && password !== "";

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    actionOnClick(userCredentials);

    setUserCredentials(initialUserCredentials);
  };

  const onChangeUserData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserCredentials({
      ...userCredentials,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <LoginFormStyled
      className="login-form"
      autoComplete="off"
      onSubmit={handleLoginSubmit}
    >
      <label htmlFor="username" className="login-form__label">
        {" "}
        Username
        <input
          type="text"
          className="login-form__control"
          id="username"
          onChange={onChangeUserData}
          value={userCredentials.username}
        />
      </label>
      <label htmlFor="password" className="login-form__label">
        {" "}
        Password
        <input
          type="text"
          className="login-form__control"
          id="password"
          onChange={onChangeUserData}
          value={userCredentials.password}
        />
      </label>
      <Button
        text="Login"
        type="submit"
        modifier="button--form"
        isDisabled={!isDisabled}
      />
    </LoginFormStyled>
  );
};

export default LoginForm;

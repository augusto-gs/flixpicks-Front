import styled from "styled-components";

const LoginFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.formBackground};
  border: ${({ theme }) => theme.colors.dark} 2px;
  margin-top: 60px;
  font-size: 20px;
  border-radius: 8px;
  padding: 16px;

  .login-form {
    &__label {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    &__control {
      height: 40px;
      border-radius: 6px;
      border: 1px solid;
      background-color: ${({ theme }) => theme.colors.background};
      padding: 8px;
      font-size: 16px;
    }
  }
`;

export default LoginFormStyled;

import styled from "styled-components";

const HeaderStyled = styled.header`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .main-header {
    &__logo {
      max-width: 197px;
      margin-top: 40px;
    }

    &__logout-button {
      background-color: transparent;
      border: none;
      position: absolute;
      margin: 20px;
      top: 0;
      right: 0;
    }
  }
`;

export default HeaderStyled;

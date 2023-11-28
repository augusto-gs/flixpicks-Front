import styled from "styled-components";

const ListPageStyled = styled.section`
  .list-page {
    &__title-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
    }

    &__title {
      text-align: center;
      max-width: 400px;
      font-size: 50px;
      font-weight: 500;
    }

    &__divider {
      width: 151px;
      height: 6px;
      background-color: black;
    }
  }
`;

export default ListPageStyled;

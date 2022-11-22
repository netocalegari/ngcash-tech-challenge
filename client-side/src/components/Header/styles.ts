import styled from "styled-components";

const Head = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 0px 30px 0px 30px;

  box-shadow: 0px 4px 32px -12px rgba(0, 0, 0, 0.25);

  .title-holder {
    margin-left: 15rem;
  }

  .button-holder {
    margin-left: 75rem;
    button {
      width: 5rem;
      height: 2.5rem;

      border-style: none;
      border-radius: 6px;

      background-color: #fd377e;
      color: #ffffff;
    }
  }
`;

export { Head };

import styled from "styled-components";

const Main = styled.main`
  display: flex;
  flex-direction: row;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-left: 17rem;
  margin-top: 2rem;
  width: 23rem;
  height: 19rem;

  border: 1px solid #e9ecef;
  border-radius: 4px;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    .input-holder {
      display: flex;
      flex-direction: column;
      margin-top: 1.5rem;

      label {
        margin-bottom: 0.3rem;
      }

      input {
        height: 2.5rem;
        width: 19rem;

        border-style: none;
        border-radius: 4px;

        background-color: #f5f2f2;
      }
    }

    button {
      margin-top: 1rem;

      height: 2.5rem;
      width: 19.5rem;

      border-style: none;
      border-radius: 4px;

      background-color: #fd377e;
      color: #ffffff;
    }
  }

  .balance-holder {
    display: flex;

    #balance-text {
      position: absolute;
      left: 18.8rem;
    }

    #value-amount {
      margin-left: 16rem;
    }
  }
`;

const ListHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  margin-left: 16rem;

  form {
    #date-input {
      margin-top: 1rem;
      margin-left: 1rem;
      width: 7rem;
      height: 2rem;

      border-style: none;
      border-radius: 4px;
    }

    button {
      width: 5rem;
      height: 2rem;

      border-style: none;
      border-radius: 4px;

      margin-left: 1rem;
    }
  }

  .button-holder {
    margin-top: 0.9rem;
    margin-left: 2rem;

    button + button {
      margin-left: 1rem;
    }

    button {
      width: 5rem;
      height: 2rem;

      border-style: none;
      border-radius: 6px;
    }
  }
`;

const ListContainer = styled.div`
  margin-left: 13.5rem;

  height: 78vh;
  overflow-y: auto;

  ul {
    li {
      display: flex;
      align-items: center;
      list-style: none;

      background-color: #f8f9fa;
      border-radius: 5px;

      height: 5rem;

      #date {
        margin-left: 1rem;
      }

      p + p {
        margin-left: 24.5rem;
      }
    }

    li + li {
      margin-top: 2rem;
    }
  }
`;

export { Main, FormContainer, ListHeader, ListContainer };

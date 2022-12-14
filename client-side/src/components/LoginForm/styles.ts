import styled from 'styled-components';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  margin-top: 12rem;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    form {
      display: flex;
      flex-direction: column;
      align-items: center;

      .input-holder {
        display: flex;
        flex-direction: column;

        label {
          font-size: 1rem;
          margin-bottom: 0.3rem;
        }

        input {
          height: 2rem;
          width: 12rem;

          border-style: none;
          border-radius: 3px;

          background-color: #F5F2F2;
        }

        .error-message {
          margin-top: 0.2rem;
          font-size: 0.9rem;
        }
      }

      .login-button {
        height: 2rem;
        width: 12.5rem;

        border-style: none;
        border-radius: 3px;

        background-color: #FD377E;
        color: #FFFFFF
      }
    }

    .register-holder {
      display: flex;
      flex-direction: column;
      align-items: center;

      button {
        height: 2rem;
        width: 12.5rem;

        border-style: none;
        border-radius: 3px;

        background-color: #FD377E;
        color: #FFFFFF
      }
    }
  }

  @media(min-width: 1024px) {
    .container {
      form {
        .input-holder {
          input {
            width: 20rem;
          }
        }

        .login-button {
          width: 20rem;
        }
      }

      .register-holder {
        button {
          width: 20rem;
        }
      }
    }
  }
`;

export { Main };